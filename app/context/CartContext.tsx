"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


type CartItem = {
  title: string;
  price: number;
};


type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void;
  total: number;
};


const CartContext = createContext<CartContextType | undefined>(
  undefined
);


export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [cart, setCart] = useState<CartItem[]>([]);


  function addToCart(item: CartItem) {

    setCart((current) => [
      ...current,
      item,
    ]);

  }


  function removeFromCart(title: string) {

    setCart((current) =>
      current.filter(
        (item) => item.title !== title
      )
    );

  }


  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
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