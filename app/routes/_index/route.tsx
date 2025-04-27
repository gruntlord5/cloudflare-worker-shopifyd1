import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import {
  Page,
  Card,
  BlockStack,
  Text,
  Link,
  FormLayout,
  TextField,
  Button,
  AppProvider,
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
  const navigate = useNavigate();

  return (
    <AppProvider i18n={enTranslations}>
      <Page>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <BlockStack gap="400">
             {/* Welcome Card */}
             <Card>
                <BlockStack gap="400">
                  <Text as="h1" variant="headingXl">
                    Welcome to Shopify App Template - Cloudflare Workers
                  </Text>
                  <div style={{ 
                    textAlign: 'center',
                    padding: '20px 0'
                  }}>
                    <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/gruntlord5/cloudflare-worker-shopifyd1/">
                      <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare"/>
                    </a>
                  </div>
                  <Text as="p" variant="bodyLg">
                    This is an example of what your domain would look like if a user visits from outside of Shopify App Bridge. You can customize this page to your liking, just make sure to enter the
                     information for your application and remove this placeholder.
                  </Text>
                  <Text as="p" variant="bodyLg">
                    Just enter your shopify domain below and click log in. For example{' '}
                    <Link url="https://admin.shopify.com/apps/bulk-product-categories/app">
                    example-store.myshopify.com
                    </Link>.
                  </Text>
                </BlockStack>
              </Card>

              {/* Login Form Card */}
              {showForm && (
                <Card>
                  <BlockStack gap="400">
                    <Form method="post" action="/auth/login">
                      <FormLayout>
                        <TextField
                          label="Shop domain"
                          type="text"
                          name="shop"
                          helpText={
                            <span>
                              e.g:{' '}
                              <Link url={`https://admin.shopify.com/apps/${APP_HANDLE}/app`}>
                                example-store.myshopify.com
                              </Link>
                            </span>
                          }
                          autoComplete="off"
                        />
                        <Button submit primary>
                          Log in
                        </Button>
                      </FormLayout>
                    </Form>
                  </BlockStack>
                </Card>
              )}

              {/* Privacy Policy Link Card */}
              <Card>
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd">
                    For information about how we handle your data, please review our{' '}
                    <Link onClick={() => navigate('/privacypolicy')}>
                      Privacy Policy
                    </Link>
                    .
                  </Text>
                </BlockStack>
              </Card>
            </BlockStack>
          </div>
        </div>
      </Page>
    </AppProvider>
  );
}