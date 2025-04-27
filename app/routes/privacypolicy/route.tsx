import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Page,
  Card,
  BlockStack,
  Text,
  Link,
  FormLayout,
  TextField,
  Button,
  Box,
  InlineStack,
  AppProvider,
  Image
} from '@shopify/polaris';
import { login } from "../../shopify.server";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import enTranslations from '@shopify/polaris/locales/en.json';

const APP_NAME = "Shopify App Template - Cloudflare Workers";
const APP_HANDLE = "cf-worker-shopify";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return json({ showForm: Boolean(login) });
};

export default function App() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <AppProvider i18n={enTranslations}>
      <Page>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <BlockStack gap="400">
              {/* Consolidated Privacy Policy Card */}
              <Card>
                <BlockStack gap="600">
                  <BlockStack gap="200">
                    <Text as="h2" variant="headingLg">
                      Privacy Policy for {APP_NAME}
                    </Text>
                    <InlineStack gap="200" align="start">
                      <Text as="span" variant="bodyMd" color="subdued">
                        Effective Date:
                      </Text>
                      <Text as="span" variant="bodyMd">
                      04/27/2025
                      </Text>
                    </InlineStack>
                  </BlockStack>

                  <Text as="p" variant="bodyMd">
                    This is an example privacy policy template. Replace this text with your actual privacy policy content that explains your app's data practices.
                  </Text>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      1. Information We Collect
                    </Text>
                    <Text as="p" variant="bodyMd">
                      In this section, explain what data your app collects from users and stores.
                    </Text>
                    <Box paddingInlineStart="400">
                      <Text as="p" variant="bodyMd">
                        • List the specific types of data your app collects
                      </Text>
                    </Box>
                  </BlockStack>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      2. How We Use Your Data
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Describe how your app uses the collected data and for what purposes.
                    </Text>
                  </BlockStack>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      3. Third-Party Services
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Explain if and how you share data with third parties or use external services.
                    </Text>
                  </BlockStack>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      4. Data Security
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Describe the measures you take to protect user data and ensure security.
                    </Text>
                  </BlockStack>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      5. Your Rights
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Outline what rights users have regarding their data and how they can exercise these rights. Include contact information for data-related inquiries.
                    </Text>
                  </BlockStack>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      6. Changes to This Privacy Policy
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Explain how you will notify users about updates to your privacy policy.
                    </Text>
                  </BlockStack>

                  <BlockStack gap="400">
                    <Text as="h3" variant="headingMd">
                      7. Contact Us
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Provide contact information for privacy-related questions or concerns.
                    </Text>
                  </BlockStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </div>
        </div>
      </Page>
    </AppProvider>
  );
}