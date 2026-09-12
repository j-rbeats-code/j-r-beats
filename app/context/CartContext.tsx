"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
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

const CART_STORAGE_KEY =
  "j-r-beats-cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart =
        window.localStorage.getItem(
          CART_STORAGE_KEY
        );

      if (savedCart) {
        const parsedCart =
          JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error(
        "Erreur chargement panier localStorage :",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Erreur sauvegarde panier localStorage :",
        error
      );
    }
  }, [cart, isLoaded]);

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