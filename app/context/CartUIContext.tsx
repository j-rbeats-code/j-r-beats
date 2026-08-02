"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


type CartUIContextType = {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};


const CartUIContext = createContext<CartUIContextType | undefined>(
  undefined
);


export function CartUIProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [isOpen, setIsOpen] = useState(false);


  function openCart() {
    setIsOpen(true);
  }


  function closeCart() {
    setIsOpen(false);
  }


  return (
    <CartUIContext.Provider
      value={{
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartUIContext.Provider>
  );
}



export function useCartUI() {

  const context = useContext(CartUIContext);


  if (!context) {
    throw new Error(
      "useCartUI doit être utilisé dans CartUIProvider"
    );
  }


  return context;
}