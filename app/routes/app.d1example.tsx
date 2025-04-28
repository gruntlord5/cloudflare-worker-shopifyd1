import { useEffect, useState } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Page, Layout, Card, Text, BlockStack, Checkbox } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import dbService from "./db.service";
import { json, useLoaderData, useFetcher } from "@remix-run/react";

// Constants for table names
const DB1_TABLE = "example_table";
const DB2_TABLE = "example_table_db2";
const DB3_TABLE = "example_table_db3";

/**
 * Helper function to initialize a database and load settings
 * @param context - Remix context
 * @param bindingName - Database binding name
 * @param tableName - Settings table name
 * @returns Database data including settings and availability status
 */
async function loadDatabaseSettings(context: any, bindingName = 'DB', tableName: string) {
  // Create a database service instance
  const service = bindingName === 'DB' ? 
    dbService : 
    new dbService.constructor();
  
  // Default response data
  let data = {
    isChecked: false,
    tableName,
    dbAvailable: false,
    allSettings: [],
    error: null
  };
  
  // Initialize the database
  const dbAvailable = service.initFromContext(context, bindingName);
  
  if (dbAvailable) {
    try {
      // Create the settings table if it doesn't exist
      await service.initSettingsTable(tableName);
      
      // Retrieve the current value of our test checkbox setting
      const result = await service.getSetting(tableName, "test_checkbox");
      
      // Convert string value to boolean
      const isChecked = result && result.value === "true";
      
      // Fetch all settings to display in the UI table
      const allSettings = await service.getAllSettings(tableName);
      
      // Update response data
      data = {
        isChecked,
        tableName,
        dbAvailable: true,
        allSettings: allSettings.results || [],
        error: null
      };
    } catch (error) {
      // Handle database errors
      console.error(`${bindingName} error:`, error);
      data.error = error instanceof Error ? error.message : String(error);
    }
  }
  
  return data;
}

/**
 * Helper function to update a setting in the database
 * @param context - Remix context
 * @param bindingName - Database binding name 
 * @param tableName - Settings table name
 * @param isChecked - New checkbox state
 * @returns Result including success status and updated data
 */
async function updateDatabaseSetting(context: any, bindingName = 'DB', tableName: string, isChecked: boolean) {
  // Create a database service instance
  const service = bindingName === 'DB' ? 
    dbService : 
    new dbService.constructor();
  
  // Initialize the database
  const dbAvailable = service.initFromContext(context, bindingName);
  
  if (dbAvailable) {
    try {
      // Update the setting using the helper method
      await service.updateSetting(tableName, "test_checkbox", isChecked ? "true" : "false");
      
      // Fetch the updated settings list
      const allSettings = await service.getAllSettings(tableName);
      
      // Return success response with updated data
      return { 
        success: true,
        dbTarget: bindingName,
        isChecked,
        allSettings: allSettings.results || []
      };
    } catch (error) {
      // Handle database errors during save
      console.error(`Database error saving setting to ${bindingName}:`, error);
      return { 
        success: false,
        dbTarget: bindingName,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  
  // Return error if database is not available
  return { 
    success: false,
    dbTarget: bindingName,
    error: `Database ${bindingName} not available` 
  };
}

/**
 * Loader function that runs on the server to prepare data for the route
 */
export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  // Authenticate the admin user before proceeding
  await authenticate.admin(request);
  
  // Load data from all three databases in parallel
  const [db1Data, db2Data, db3Data] = await Promise.all([
    loadDatabaseSettings(context, 'DB', DB1_TABLE),
    loadDatabaseSettings(context, 'DB2', DB2_TABLE),
    loadDatabaseSettings(context, 'DB3', DB3_TABLE)
  ]);
  
  // Return all data
  return json({ db1: db1Data, db2: db2Data, db3: db3Data });
};

/**
 * Action function to handle form submissions
 */
export async function action({ request, context }: LoaderFunctionArgs) {
  // Authenticate the admin user
  await authenticate.admin(request);
  
  // Parse the form data from the request
  const formData = await request.formData();
  const action = formData.get("action") as string;
  const dbTarget = formData.get("dbTarget") as string;
  
  // Handle different action types
  if (action === "updateSettings") {
    const isChecked = formData.get("isChecked") === "true";
    
    // Update the appropriate database based on the target
    if (dbTarget === "DB3") {
      return json(await updateDatabaseSetting(context, 'DB3', DB3_TABLE, isChecked));
    } else if (dbTarget === "DB2") {
      return json(await updateDatabaseSetting(context, 'DB2', DB2_TABLE, isChecked));
    } else {
      return json(await updateDatabaseSetting(context, 'DB', DB1_TABLE, isChecked));
    }
  }
  
  // Return error for unknown actions
  return json({ success: false, error: "Unknown action" });
}

/**
 * Main component for the settings page
 */
export default function Index() {
  // Get the Shopify app bridge instance for UI interactions
  const shopify = useAppBridge();
  
  // Load data from our server loader function
  const { db1, db2, db3 } = useLoaderData();
  
  // Use Remix fetcher for form submissions without navigation
  const fetcher = useFetcher();
  
  // Local state management for DB1
  const [checkboxStateDB1, setCheckboxStateDB1] = useState(db1.isChecked);
  const [saveErrorDB1, setSaveErrorDB1] = useState("");
  const [tableDataDB1, setTableDataDB1] = useState(db1.allSettings);
  
  // Local state management for DB2
  const [checkboxStateDB2, setCheckboxStateDB2] = useState(db2.isChecked);
  const [saveErrorDB2, setSaveErrorDB2] = useState("");
  const [tableDataDB2, setTableDataDB2] = useState(db2.allSettings);

  // Local state management for DB3
  const [checkboxStateDB3, setCheckboxStateDB3] = useState(db3.isChecked);
  const [saveErrorDB3, setSaveErrorDB3] = useState("");
  const [tableDataDB3, setTableDataDB3] = useState(db3.allSettings);

  // Effect to handle fetcher state changes
  useEffect(() => {
    if (fetcher.data) {
      const { success, dbTarget, error, allSettings } = fetcher.data;
      
      // Handle errors and update table data based on target database
      if (dbTarget === "DB3") {
        setSaveErrorDB3(!success && error ? error : "");
        if (success && allSettings) setTableDataDB3(allSettings);
      } else if (dbTarget === "DB2") {
        setSaveErrorDB2(!success && error ? error : "");
        if (success && allSettings) setTableDataDB2(allSettings);
      } else {
        setSaveErrorDB1(!success && error ? error : "");
        if (success && allSettings) setTableDataDB1(allSettings);
      }
    }
  }, [fetcher.data]);

  /**
   * Generic handler for checkbox state changes
   */
  const handleCheckboxChange = (dbTarget, checked) => {
    // Update local state
    if (dbTarget === "DB3") {
      setCheckboxStateDB3(checked);
    } else if (dbTarget === "DB2") {
      setCheckboxStateDB2(checked);
    } else {
      setCheckboxStateDB1(checked);
    }
    
    const dbAvailable = dbTarget === "DB3" ? db3.dbAvailable : 
                        dbTarget === "DB2" ? db2.dbAvailable : db1.dbAvailable;
    
    if (dbAvailable) {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append("action", "updateSettings");
      formData.append("dbTarget", dbTarget);
      formData.append("isChecked", checked.toString());
      
      // Submit the form using the fetcher
      fetcher.submit(formData, { method: "post" });
      
      // Show a success toast notification if not in error state
      if (!fetcher.data || fetcher.data.success) {
        shopify.toast.show(`Setting saved to ${dbTarget}`);
      }
    } else {
      // Show warning if database is not available
      shopify.toast.show(`Database ${dbTarget} not available, setting not saved`);
    }
  };

  /**
   * Helper function to format timestamps to readable dates
   */
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleString();
  };

  /**
   * Render a database settings section for each DB
   */
  const renderDatabaseSection = (dbName, isChecked, onChange, isAvailable, error) => (
    <BlockStack gap="200">
      <Checkbox
        label={isChecked ? `${dbName}: This box is checked` : `${dbName}: This box is not checked`}
        checked={isChecked}
        disabled={fetcher.state !== "idle"}
        onChange={onChange}
      />
      {error && (
        <Text as="p" variant="bodyMd" color="critical">
          Error: {error}
        </Text>
      )}
      {!isAvailable && (
        <Text as="p" variant="bodyMd" color="subdued">
          Note: Database {dbName} is not available. Settings will not persist between sessions.
        </Text>
      )}
    </BlockStack>
  );

  /**
   * Render a table for database contents
   */
  const renderDatabaseTable = (dbName, tableName, tableData) => (
    <BlockStack gap="400">
      <Text as="h3" variant="headingSm">
        {dbName}: {tableName}
      </Text>
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
          No data available in the database table, click the checkbox above to write test data. If you have not created DB2 and DB3 manually, check the wrangler_multidbexample.jsonc file for details on how to do so.
        </Text>
      )}
    </BlockStack>
  );

  // Render the UI with consolidated cards
  return (
    <Page title="Multiple D1 Database Example">
      <Layout>
        {/* Consolidated Settings Card */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Database Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Toggle these checkboxes to write values to each database. Changes will be reflected in the table below.
              </Text>
              
              {/* DB1 Settings */}
              {renderDatabaseSection(
                "DB1", 
                checkboxStateDB1, 
                (checked) => handleCheckboxChange("DB1", checked),
                db1.dbAvailable,
                saveErrorDB1
              )}
              
              {/* DB2 Settings */}
              {renderDatabaseSection(
                "DB2", 
                checkboxStateDB2, 
                (checked) => handleCheckboxChange("DB2", checked),
                db2.dbAvailable,
                saveErrorDB2
              )}
              
              {/* DB3 Settings */}
              {renderDatabaseSection(
                "DB3", 
                checkboxStateDB3, 
                (checked) => handleCheckboxChange("DB3", checked),
                db3.dbAvailable,
                saveErrorDB3
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
        
        {/* Consolidated Database Contents Card */}
        <Layout.Section>
          <Card>
            <BlockStack gap="600">
              <Text as="h2" variant="headingMd">
                Database Contents
              </Text>
              
              {/* DB1 Contents */}
              {renderDatabaseTable("DB1", db1.tableName, tableDataDB1)}
              
              {/* Divider */}
              <div style={{ borderBottom: '1px solid #ddd', width: '100%' }}></div>
              
              {/* DB2 Contents */}
              {renderDatabaseTable("DB2", db2.tableName, tableDataDB2)}
              
              {/* Divider */}
              <div style={{ borderBottom: '1px solid #ddd', width: '100%' }}></div>
              
              {/* DB3 Contents */}
              {renderDatabaseTable("DB3", db3.tableName, tableDataDB3)}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}