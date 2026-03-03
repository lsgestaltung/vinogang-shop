// ===== SHOPIFY TYPES =====

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyPrice;
  maxVariantPrice: ShopifyPrice;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  priceRange: ShopifyPriceRange;
  compareAtPriceRange: ShopifyPriceRange;
  featuredImage: ShopifyImage | null;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  seo: {
    title: string | null;
    description: string | null;
  };
  metafields: ShopifyMetafield[];
}

export interface ShopifyMetafield {
  key: string;
  namespace: string;
  value: string;
  type: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: ShopifyPrice;
    totalAmount: ShopifyPrice;
    totalTaxAmount: ShopifyPrice | null;
  };
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
  totalQuantity: number;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: ShopifyPrice;
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyPrice;
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
}

// ===== TRANSFORMED TYPES (For Frontend Use) =====

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  options: ProductOption[];
  price: number;
  compareAtPrice: number | null;
  priceRange: {
    min: number;
    max: number;
  };
  featuredImage: ProductImage | null;
  images: ProductImage[];
  variants: ProductVariant[];
  seo: {
    title: string | null;
    description: string | null;
  };
  metafields: Record<string, string>;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductImage {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: number;
  compareAtPrice: number | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ProductImage | null;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ProductImage | null;
  products: Product[];
}

// ===== API RESPONSE TYPES =====

export interface ShopifyProductsResponse {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

export interface ShopifyCollectionResponse {
  collection: ShopifyCollection | null;
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: {
      node: ShopifyCollection;
    }[];
  };
}

export interface ShopifyCartResponse {
  cart: ShopifyCart | null;
}

export interface ShopifyCartCreateResponse {
  cartCreate: {
    cart: ShopifyCart;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}

export interface ShopifyCartLinesAddResponse {
  cartLinesAdd: {
    cart: ShopifyCart;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}

export interface ShopifyCartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: ShopifyCart;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}

export interface ShopifyCartLinesRemoveResponse {
  cartLinesRemove: {
    cart: ShopifyCart;
    userErrors: {
      field: string[];
      message: string;
    }[];
  };
}
