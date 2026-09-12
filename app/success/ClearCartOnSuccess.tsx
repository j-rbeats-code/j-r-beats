"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useCart } from "../context/CartContext";

export default function ClearCartOnSuccess() {
  const { clearCart } = useCart();

  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) {
      return;
    }

    hasCleared.current = true;

    clearCart();
  }, [clearCart]);

  return null;
}