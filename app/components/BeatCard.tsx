"use client";

import Link from "next/link";
import {
  Heart,
  Play,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import AudioPlayer from "./AudioPlayer";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

type BeatCardProps = {
  slug: string;
  title: string;
  price: string;
  image: string;
  bpm: string;
  keyName: string;
  duration: string;
  exclusiveSold: boolean;
};

export default function BeatCard({
  slug,
  title,
  price,
  image,
  bpm,
  keyName,
  duration,
  exclusiveSold,
}: BeatCardProps) {
  const { addToCart } = useCart();

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();

  const favorite = isFavorite(slug);

  function handleAddToCart() {
    if (exclusiveSold) {
      return;
    }

    addToCart({
      slug,
      title,
      license: "MP3",
      price: Number(
        price
          .replace(",", ".")
          .replace(" €", "")
      ),
      licenseAccepted: true,
    });
  }

  function handleFavorite() {
    toggleFavorite({
      slug,
      title,
    });
  }

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border bg-zinc-900/90 p-5 transition duration-500 ${
        exclusiveSold
          ? "border-red-500/40 opacity-80"
          : "border-white/10 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-[0_20px_60px_rgba(126,34,206,0.25)]"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <Link
          href={`/beats/${slug}`}
          aria-label={`Voir la page de ${title}`}
          className="block"
        >
          <img
            src={image}
            alt={title}
            className={`h-64 w-full object-cover transition duration-700 ${
              exclusiveSold
                ? "grayscale"
                : "group-hover:scale-110"
            }`}
          />
        </Link>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80" />

        {exclusiveSold ? (
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-red-400/40 bg-red-950/80 px-3 py-1 text-xs font-black uppercase tracking-wider text-red-300 backdrop-blur-md">
            EXCLUSIVE SOLD
          </div>
        ) : (
          <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-purple-400/30 bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300 backdrop-blur-md">
            <Sparkles size={13} />
            Nouveau
          </div>
        )}

        {!exclusiveSold && (
          <Link
            href={`/beats/${slug}`}
            aria-label={`Voir et écouter ${title}`}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-purple-600/90 text-white opacity-0 shadow-[0_0_35px_rgba(168,85,247,0.6)] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:opacity-100"
          >
            <Play
              size={27}
              fill="currentColor"
              className="ml-1"
            />
          </Link>
        )}

        <button
          type="button"
          onClick={handleFavorite}
          aria-label={
            favorite
              ? `Retirer ${title} des favoris`
              : `Ajouter ${title} aux favoris`
          }
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition ${
            favorite
              ? "border-purple-400 bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              : "border-white/15 bg-black/60 text-white hover:border-purple-400 hover:text-purple-400"
          }`}
        >
          <Heart
            size={18}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      <div className="mt-5">
        <Link
          href={`/beats/${slug}`}
          className="inline-block"
        >
          <h3 className="text-2xl font-black tracking-tight text-white transition hover:text-purple-400">
            {title}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-zinc-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {bpm}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {keyName}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            {duration}
          </span>
        </div>
      </div>

      <AudioPlayer
        src={`/audio/${slug}.mp3`}
        title={title}
      />

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            {exclusiveSold
              ? "Statut"
              : "À partir de"}
          </p>

          <p
            className={`mt-1 text-2xl font-black ${
              exclusiveSold
                ? "text-red-400"
                : "text-purple-400"
            }`}
          >
            {exclusiveSold
              ? "VENDU"
              : price}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={exclusiveSold}
          className={`flex items-center gap-2 rounded-full px-5 py-3 font-bold transition duration-300 ${
            exclusiveSold
              ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
              : "bg-white text-black hover:scale-105 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_28px_rgba(168,85,247,0.45)]"
          }`}
        >
          <ShoppingCart size={18} />

          {exclusiveSold
            ? "Vendu"
            : "Acheter"}
        </button>
      </div>
    </article>
  );
}