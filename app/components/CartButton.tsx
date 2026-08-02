"use client";

import { useCart } from "../context/CartContext";
import { useCartUI } from "../context/CartUIContext";


export default function CartButton() {

  const { cart } = useCart();

  const { openCart } = useCartUI();


  return (
    <button
      onClick={openCart}
      className="relative flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-5 py-3 transition hover:bg-purple-600"
    >

      <span className="text-xl">
        🛒
      </span>


      <span className="font-bold">
        Panier
      </span>


      {cart.length > 0 && (

        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-sm font-bold">

          {cart.length}

        </span>

      )}

    </button>
  );
}