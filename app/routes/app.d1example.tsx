import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Page, Layout, Card, Text, BlockStack, Checkbox } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import dbService from "./db.service";
import { json, useLoaderData, useFetcher } from "@remix-run/react";

/**
 * Loader function that runs on the server to prepare data for the route
 * @param param0 - Remix loader args containing request and context
 * @returns JSON response with settings and database status
 */
export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  // Authenticate the admin user before proceeding
  await authenticate.admin(request);
  
  // Initialize the database using our centralized service
  // This connects to the D1 database binding from the Cloudflare Worker context
  const dbAvailable = dbService.initFromContext(context);
  
  // Use a fixed table name for the example
  const settingsTableName = "example_table";
  
  if (dbAvailable) {
    try {
      // Create the settings table if it doesn't exist
      // Note: All SQL queries must be D1-compatible (SQLite syntax) and on ideally on one line
      await dbService.executeQuery(`CREATE TABLE IF NOT EXISTS ${settingsTableName} (key TEXT PRIMARY KEY, value TEXT, updated_at INTEGER)`);
      
      // Retrieve the current value of our test checkbox setting
      // Using parameterized query for security
      const result = await dbService.getFirstRow(`SELECT value FROM ${settingsTableName} WHERE key = ?`, ["test_checkbox"]);
      
      // Convert string value to boolean
      const isChecked = result && result.value === "true";
      
      // Fetch all settings to display in the UI table
      const allSettings = await dbService.getAllRows(`SELECT key, value, updated_at FROM ${settingsTableName}`);
      
      // Return all the data needed by the frontend
      return json({
        isChecked,
        settingsTableName,
        dbAvailable: true,
        allSettings: allSettings.results || []
      });
    } catch (error) {
      // Handle database errors
      console.error("Database error:", error);
      return json({
        isChecked: false,
        dbAvailable: false,
        allSettings: [],
        settingsTableName,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
  
  // Return default values if database is not available
  return json({
    isChecked: false,
    dbAvailable: false,
    allSettings: [],
    settingsTableName
  });
};

/**
 * Action function to handle form submissions
 * @param param0 - Remix action args containing request and context
 * @returns JSON response with action result
 */
export async function action({ request, context }: LoaderFunctionArgs) {
  // Authenticate the admin user
  await authenticate.admin(request);
  
  // Parse the form data from the request
  const formData = await request.formData();
  const action = formData.get("action") as string;
  
  // Handle different action types - currently only supporting updateSettings
  if (action === "updateSettings") {
    const isChecked = formData.get("isChecked") === "true";
    
    // Use the same fixed table name as in the loader
    const tableName = "example_table";
    
    // Initialize the database connection
    const dbAvailable = dbService.initFromContext(context);
    
    if (dbAvailable) {
      try {
        // Update or insert the setting with current timestamp
        // Note: All SQL queries must be D1-compatible (SQLite syntax) and on ideally on one line
        await dbService.executeQuery(`INSERT OR REPLACE INTO ${tableName} (key, value, updated_at) VALUES (?, ?, ?)`, ["test_checkbox", isChecked ? "true" : "false", Date.now()]);
        
        // Fetch the updated settings list
        const allSettings = await dbService.getAllRows(`SELECT key, value, updated_at FROM ${tableName}`);
        
        // Return success response with updated data
        return json({ 
          success: true, 
          isChecked,
          allSettings: allSettings.results || []
        });
      } catch (error) {
        // Handle database errors during save
        console.error("Database error saving setting:", error);
        return json({ 
          success: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }
    
    // Return error if database is not available
    return json({ 
      success: false,
      error: "Database not available" 
    });
  }
  
  // Return error for unknown actions
  return json({ 
    success: false,
    error: "Unknown action" 
  });
}

/**
 * Main component for the settings page
 * Displays a checkbox that saves state to D1 database
 */
export default function Index() {
  // Get the Shopify app bridge instance for UI interactions
  const shopify = useAppBridge();
  
  // Load data from our server loader function
  const { isChecked, settingsTableName, dbAvailable, allSettings } = useLoaderData();
  
  // Use Remix fetcher for form submissions without navigation
  const fetcher = useFetcher();
  
  // Local state management
  const [checkboxState, setCheckboxState] = useState(isChecked);
  const [saveError, setSaveError] = useState("");
  const [tableData, setTableData] = useState(allSettings);

  // Effect to handle fetcher state changes
  useEffect(() => {
    // Display any errors that occurred during form submission
    if (fetcher.data && !fetcher.data.success && fetcher.data.error) {
      setSaveError(fetcher.data.error);
    } else {
      setSaveError("");
    }
    
    // Update table data when new data is received
    if (fetcher.data && fetcher.data.success && fetcher.data.allSettings) {
      setTableData(fetcher.data.allSettings);
    }
  }, [fetcher.data]);

  /**
   * Handles checkbox state changes and saves to database
   * @param checked - New checkbox state
   */
  const handleCheckboxChange = (checked) => {
    setCheckboxState(checked);
    
    if (dbAvailable) {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append("action", "updateSettings");
      formData.append("isChecked", checked.toString());
      
      // Submit the form using the fetcher
      fetcher.submit(formData, { method: "post" });
      
      // Show a success toast notification if not in error state
      if (!fetcher.data || fetcher.data.success) {
        shopify.toast.show('Setting saved');
      }
    } else {
      // Show warning if database is not available
      shopify.toast.show('Database not available, setting not saved');
    }
  };

  /**
   * Helper function to format timestamps to readable dates
   * @param timestamp - Unix timestamp in milliseconds
   * @returns Formatted date string
   */
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleString();
  };

  // Render the UI components
  return (
    <Page>
      <Layout>
        {/* Settings Card */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Test Saving to D1
              </Text>
              <Text as="p" variant="bodyMd">
                This is an example of interacting with a D1 Database binding in the remix route. Check the box to write a value to D1 and it will be displayed in the "Database Contents" Polaris card.

              </Text>
              {/* Checkbox component that saves state to D1 */}
              <Checkbox
                label={checkboxState ? "This box is checked" : "This box is not checked"}
                checked={checkboxState}
                disabled={fetcher.state !== "idle"}
                onChange={handleCheckboxChange}
              />
              {/* Error message display */}
              {saveError && (
                <Text as="p" variant="bodyMd" color="critical">
                  Error: {saveError}
                </Text>
              )}
              {/* Warning when database is not available */}
              {!dbAvailable && (
                <Text as="p" variant="bodyMd" color="subdued">
                  Note: Database is not available. Settings will not persist between sessions.
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
        
        {/* Database contents display */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Database Contents
              </Text>
              <Text as="p" variant="bodyMd">
                Current data in the "{settingsTableName}":
              </Text>
              
              {/* Show table data if available */}
              {tableData && tableData.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #ddd' }}>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Key</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Value</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '8px' }}>{row.key}</td>
                          <td style={{ padding: '8px' }}>{row.value}</td>
                          <td style={{ padding: '8px' }}>{formatDate(row.updated_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Text as="p" variant="bodyMd" color="subdued">
                  No data available in the database table, click the checkbox above to write test data.
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}