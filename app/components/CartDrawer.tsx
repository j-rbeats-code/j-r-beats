"use client";

import {
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

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

  const [
    digitalContentAccepted,
    setDigitalContentAccepted,
  ] = useState(false);

  const [
    isCheckingOut,
    setIsCheckingOut,
  ] = useState(false);

  const drawerClass = isOpen
    ? "translate-x-0"
    : "translate-x-full";

  async function handleCheckout() {
    if (
      !digitalContentAccepted ||
      cart.length === 0 ||
      isCheckingOut
    ) {
      return;
    }

    const allLicensesAccepted =
      cart.every(
        (item) =>
          item.licenseAccepted === true
      );

    if (!allLicensesAccepted) {
      alert(
        "Toutes les licences du panier doivent être acceptées."
      );

      return;
    }

    setIsCheckingOut(true);

    try {
      const response = await fetch(
        "/api/checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            cart: cart.map((item) => ({
              slug: item.slug,
              license: item.license,
              licenseAccepted:
                item.licenseAccepted,
            })),

            digitalContentAccepted: true,
          }),
        }
      );

      const data =
        await response.json();

      /*
       * BEAT VENDU EN EXCLUSIVE
       * ENTRE L'AJOUT AU PANIER
       * ET LE PASSAGE EN CAISSE
       */
      if (response.status === 409) {
        alert(
          data.error ||
            "Un beat de ton panier vient d'être vendu en exclusivité et n'est plus disponible. Retire-le du panier pour continuer."
        );

        setDigitalContentAccepted(false);

        return;
      }

      if (!response.ok) {
        console.error(
          "Erreur Checkout :",
          data.error
        );

        alert(
          data.error ||
            "Impossible de lancer le paiement."
        );

        return;
      }

      if (data.url) {
        window.location.href =
          data.url;

        return;
      }

      alert(
        "Stripe n'a pas retourné de lien de paiement."
      );
    } catch (error) {
      console.error(
        "Erreur paiement :",
        error
      );

      alert(
        "Une erreur est survenue pendant le paiement."
      );
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-black/95 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${drawerClass}`}
    >
      {/* EN-TÊTE */}

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <ShoppingBag
            size={24}
            className="text-purple-400"
          />

          <h2 className="text-2xl font-black">
            Ton panier
          </h2>
        </div>

        <button
          type="button"
          onClick={closeCart}
          aria-label="Fermer le panier"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-purple-400 hover:text-purple-400"
        >
          <X size={20} />
        </button>
      </div>

      {/* CONTENU DU PANIER */}

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <ShoppingBag
              size={48}
              className="mb-4 text-zinc-700"
            />

            <p className="text-lg font-bold text-zinc-300">
              Ton panier est vide
            </p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
              Choisis un beat et une licence
              pour commencer ta commande.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/80 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Licence{" "}
                    {item.license}
                  </p>

                  <p className="mt-1 text-xs font-bold text-green-400">
                    Licence acceptée
                  </p>

                  <p className="mt-1 text-sm font-black text-purple-400">
                    {item.price
                      .toFixed(2)
                      .replace(
                        ".",
                        ","
                      )}{" "}
                    €
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    removeFromCart(
                      item.id
                    );

                    setDigitalContentAccepted(
                      false
                    );
                  }}
                  aria-label={`Supprimer ${item.title}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TOTAL + COMMANDE */}

      <div className="border-t border-white/10 bg-black px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-lg font-bold">
            Total
          </span>

          <span className="text-2xl font-black text-purple-400">
            {total
              .toFixed(2)
              .replace(".", ",")}{" "}
            €
          </span>
        </div>

        {cart.length > 0 && (
          <div className="mb-5 rounded-xl border border-white/10 bg-zinc-900/70 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={
                  digitalContentAccepted
                }
                disabled={isCheckingOut}
                onChange={(event) =>
                  setDigitalContentAccepted(
                    event.target.checked
                  )
                }
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-purple-600 disabled:cursor-not-allowed"
              />

              <span className="text-xs leading-5 text-zinc-300">
                Je demande la fourniture
                immédiate des fichiers numériques
                avant la fin du délai légal de
                rétractation et je reconnais que
                cette exécution immédiate entraîne
                la perte de mon droit de
                rétractation dans les conditions
                prévues par la loi.
              </span>
            </label>

            {!digitalContentAccepted && (
              <p className="mt-3 pl-8 text-xs text-zinc-500">
                Cette confirmation est
                obligatoire pour accéder aux
                fichiers immédiatement après le
                paiement.
              </p>
            )}
          </div>
        )}

        {cart.length > 0 && (
          <p className="mb-4 text-center text-xs leading-5 text-zinc-400">
            En passant commande, je reconnais
            avoir pris connaissance des{" "}
            <a
              href="/cgv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-purple-400 underline transition hover:text-purple-300"
            >
              Conditions Générales de Vente
            </a>{" "}
            et des conditions de la licence
            sélectionnée.
          </p>
        )}

        <button
          type="button"
          onClick={handleCheckout}
          disabled={
            cart.length === 0 ||
            !digitalContentAccepted ||
            isCheckingOut
          }
          className={`w-full rounded-xl px-3 py-4 text-sm font-black uppercase text-white transition sm:text-base ${
            cart.length > 0 &&
            digitalContentAccepted &&
            !isCheckingOut
              ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:scale-[1.01]"
              : "cursor-not-allowed bg-zinc-800 text-zinc-500"
          }`}
        >
          {isCheckingOut
            ? "Vérification..."
            : cart.length === 0
              ? "Commander avec obligation de paiement"
              : digitalContentAccepted
                ? "Commander avec obligation de paiement"
                : "Confirmer pour commander"}
        </button>

        <p className="mt-3 text-center text-xs text-zinc-500">
          Paiement sécurisé
        </p>
      </div>
    </aside>
  );
}