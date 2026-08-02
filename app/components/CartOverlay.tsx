"use client";

import { useCartUI } from "../context/CartUIContext";


export default function CartOverlay() {

  const {
    isOpen,
    closeCart,
  } = useCartUI();


  if (!isOpen) {
    return null;
  }


  return (
    <div
      onClick={closeCart}
      className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
    />
  );
}