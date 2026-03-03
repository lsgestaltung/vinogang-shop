"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { CartDrawer } from "./CartDrawer";

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  image: string;
  price: number;
  quantity: number;
  handle: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  isLoading: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "vinogang-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setItems(parsed);
      } catch (e) {
        console.error("Failed to parse cart:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.variantId === newItem.variantId
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.variantId === newItem.variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...currentItems, { ...newItem, quantity }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((variantId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.variantId !== variantId)
    );
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((currentItems) =>
        currentItems.filter((item) => item.variantId !== variantId)
      );
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const checkout = useCallback(async () => {
    if (items.length === 0) return;

    setIsLoading(true);

    try {
      // Create Shopify checkout URL
      const lineItems = items
        .map(
          (item) =>
            `${item.variantId.replace("gid://shopify/ProductVariant/", "")}:${item.quantity}`
        )
        .join(",");

      const checkoutUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${lineItems}`;

      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        isOpen,
        isLoading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        checkout,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
