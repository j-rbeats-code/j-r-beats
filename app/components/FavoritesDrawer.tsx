"use client";

import Link from "next/link";
import {
  Heart,
  Trash2,
  X,
} from "lucide-react";

import { useFavorites } from "../context/FavoritesContext";

type FavoritesDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function FavoritesDrawer({
  open,
  onClose,
}: FavoritesDrawerProps) {
  const {
    favorites,
    toggleFavorite,
  } = useFavorites();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Fermer les favoris"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-black/95 text-white shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-3">
            <Heart
              size={24}
              className="text-purple-400"
              fill="currentColor"
            />

            <div>
              <h2 className="text-2xl font-black">
                Tes favoris
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                {favorites.length} beat
                {favorites.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer les favoris"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-purple-400 hover:text-purple-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {favorites.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Heart
                size={48}
                className="mb-4 text-zinc-700"
              />

              <p className="text-lg font-bold text-zinc-300">
                Aucun favori
              </p>

              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                Clique sur le cœur d&apos;un beat
                pour l&apos;ajouter ici.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((item) => (
                <div
                  key={item.slug}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-900/80 p-4"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/beats/${item.slug}`}
                      onClick={onClose}
                      className="block truncate font-bold text-white transition hover:text-purple-400"
                    >
                      {item.title}
                    </Link>

                    <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                      Beat favori
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toggleFavorite({
                        slug: item.slug,
                        title: item.title,
                      })
                    }
                    aria-label={`Retirer ${item.title} des favoris`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10 text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}