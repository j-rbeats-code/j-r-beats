"use client";

import { useCart } from "../context/CartContext";
import { useCartUI } from "../context/CartUIContext";


export default function CartDrawer() {

  const {
    cart,
    removeFromCart,
    total,
  } = useCart();


  const {
    isOpen,
    closeCart,
  } = useCartUI();


  const drawerClass = isOpen
    ? "translate-x-0"
    : "translate-x-full";


  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-96 border-l border-white/10 bg-black p-8 text-white shadow-2xl transition-transform duration-300 ${drawerClass}`}
    >

      <button
        onClick={closeCart}
        className="absolute right-6 top-6 text-2xl"
      >
        ✕
      </button>


      <h2 className="text-3xl font-black">
        Ton panier
      </h2>


      <div className="mt-8 space-y-4">

        {cart.length === 0 ? (

          <p className="text-gray-400">
            Ton panier est vide
          </p>

        ) : (

          cart.map((item) => (

            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl bg-zinc-900 p-4"
            >

              <div>

                <p className="font-bold">
                  {item.title}
                </p>


                <p className="text-purple-400">
                  {item.price.toFixed(2)} €
                </p>

              </div>


              <button
                onClick={() =>
                  removeFromCart(item.title)
                }
                className="text-red-400 hover:text-red-300"
              >
                ✕
              </button>


            </div>

          ))

        )}

      </div>


      <div className="absolute bottom-8 left-8 right-8">


        <div className="mb-5 flex justify-between text-xl font-bold">

          <span>
            Total
          </span>


          <span className="text-purple-400">
            {total.toFixed(2)} €
          </span>

        </div>


        <button
          className="w-full rounded-full bg-purple-600 py-4 font-bold transition hover:bg-purple-700"
        >
          Commander
        </button>


      </div>


    </aside>
  );
}