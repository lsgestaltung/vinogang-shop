import { shopifyFetch } from "./client";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCTS_BY_COLLECTION,
  GET_PRODUCT_RECOMMENDATIONS,
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
} from "./queries";
import {
  ShopifyProduct,
  ShopifyProductsResponse,
  ShopifyProductResponse,
  ShopifyCollectionResponse,
  ShopifyCollectionsResponse,
  Product,
  ProductImage,
  ProductVariant,
  Collection,
} from "./types";

// ===== TRANSFORMERS =====

function transformImage(image: {
  url: string;
  altText: string | null;
  width: number;
  height: number;
} | null): ProductImage | null {
  if (!image) return null;
  return {
    url: image.url,
    altText: image.altText || "",
    width: image.width,
    height: image.height,
  };
}

function transformProduct(shopifyProduct: ShopifyProduct): Product {
  const variants: ProductVariant[] = shopifyProduct.variants.edges.map(
    ({ node }) => ({
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      quantityAvailable: node.quantityAvailable,
      price: parseFloat(node.price.amount),
      compareAtPrice: node.compareAtPrice
        ? parseFloat(node.compareAtPrice.amount)
        : null,
      selectedOptions: node.selectedOptions,
      image: transformImage(node.image),
    })
  );

  const images: ProductImage[] = shopifyProduct.images.edges
    .map(({ node }) => transformImage(node))
    .filter((img): img is ProductImage => img !== null);

  const metafields: Record<string, string> = {};
  shopifyProduct.metafields?.forEach((mf) => {
    if (mf) {
      metafields[`${mf.namespace}.${mf.key}`] = mf.value;
    }
  });

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    availableForSale: shopifyProduct.availableForSale,
    productType: shopifyProduct.productType,
    tags: shopifyProduct.tags,
    options: shopifyProduct.options.map((opt) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values,
    })),
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    compareAtPrice: shopifyProduct.compareAtPriceRange?.minVariantPrice
      ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
      : null,
    priceRange: {
      min: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
      max: parseFloat(shopifyProduct.priceRange.maxVariantPrice.amount),
    },
    featuredImage: transformImage(shopifyProduct.featuredImage),
    images,
    variants,
    seo: shopifyProduct.seo,
    metafields,
  };
}

// ===== API FUNCTIONS =====

export async function getProducts(options?: {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const { first = 50, sortKey = "BEST_SELLING", reverse = false } = options || {};

  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: GET_PRODUCTS,
    variables: { first, sortKey, reverse },
    tags: ["products"],
  });

  return data.products.edges.map(({ node }) => transformProduct(node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    tags: ["products", `product-${handle}`],
  });

  if (!data.product) return null;
  return transformProduct(data.product);
}

export async function getProductsByCollection(
  collectionHandle: string,
  first: number = 50
): Promise<Collection | null> {
  const data = await shopifyFetch<ShopifyCollectionResponse>({
    query: GET_PRODUCTS_BY_COLLECTION,
    variables: { handle: collectionHandle, first },
    tags: ["collections", `collection-${collectionHandle}`],
  });

  if (!data.collection) return null;

  return {
    id: data.collection.id,
    handle: data.collection.handle,
    title: data.collection.title,
    description: data.collection.description,
    image: transformImage(data.collection.image),
    products: data.collection.products.edges.map(({ node }) =>
      transformProduct(node)
    ),
  };
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
    query: GET_PRODUCT_RECOMMENDATIONS,
    variables: { productId },
    cache: "no-store",
  });

  return (data.productRecommendations || []).map(transformProduct);
}

export async function getCollections(): Promise<
  { id: string; handle: string; title: string; description: string }[]
> {
  const data = await shopifyFetch<ShopifyCollectionsResponse>({
    query: GET_COLLECTIONS,
    variables: { first: 20 },
    tags: ["collections"],
  });

  return data.collections.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
  }));
}

export async function getCollectionByHandle(
  handle: string,
  first: number = 50
): Promise<Collection | null> {
  const data = await shopifyFetch<ShopifyCollectionResponse>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, first },
    tags: ["collections", `collection-${handle}`],
  });

  if (!data.collection) return null;

  return {
    id: data.collection.id,
    handle: data.collection.handle,
    title: data.collection.title,
    description: data.collection.description,
    image: transformImage(data.collection.image),
    products: data.collection.products.edges.map(({ node }) =>
      transformProduct(node)
    ),
  };
}

// Re-export types
export type { Product, ProductVariant, ProductImage, ProductOption, Collection } from "./types";
