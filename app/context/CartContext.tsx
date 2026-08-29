"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export type LicenseType =
  | "MP3"
  | "WAV"
  | "PREMIUM"
  | "EXCLUSIVE";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  license: LicenseType;
  price: number;
  licenseAccepted: boolean;
};

type NewCartItem = Omit<CartItem, "id">;

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: NewCartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: NewCartItem) {
    const newItem: CartItem = {
      ...item,
      id: crypto.randomUUID(),
    };

    setCart((current) => [
      ...current,
      newItem,
    ]);
  }

  function removeFromCart(id: string) {
    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price,
      0
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart doit être utilisé dans CartProvider"
    );
  }

  return context;
}