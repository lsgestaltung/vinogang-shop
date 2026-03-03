const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = "2024-01";

export interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
}

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  tags,
}: ShopifyFetchOptions): Promise<T> {
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    ...(tags && { next: { tags } }),
  };

  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      console.error("Shopify GraphQL errors:", json.errors);
      throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
    }

    return json.data as T;
  } catch (error) {
    console.error("Shopify fetch error:", error);
    throw error;
  }
}

// Helper to revalidate cache tags
export async function revalidateShopifyCache(tags: string[]) {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags }),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
  }
}
