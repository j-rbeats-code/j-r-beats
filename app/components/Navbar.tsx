"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Menu,
  User,
  X,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import CartButton from "./CartButton";
import FavoritesDrawer from "./FavoritesDrawer";
import { useFavorites } from "../context/FavoritesContext";
import { supabase } from "../../lib/supabase";

const links = [
  { label: "Accueil", href: "#" },
  { label: "Beats", href: "#beats" },
  { label: "Licences", href: "#licenses" },
  { label: "Exclusif", href: "#exclusive" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [favoritesOpen, setFavoritesOpen] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const {
    favoritesCount,
  } = useFavorites();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(Boolean(user));
    }

    checkUser();

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setIsLoggedIn(
            Boolean(session?.user)
          );
        }
      );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  function openFavorites() {
    setFavoritesOpen(true);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-28 max-w-[1500px] items-center justify-between px-6 lg:px-10">
          <Link
            href="#"
            aria-label="Retour à l’accueil"
            className="relative block h-28 w-40 shrink-0"
          >
            <Image
              src="/images/logo-jr-beats-transparent.png"
              alt="J-R Beats"
              fill
              priority
              sizes="160px"
              className="object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(
              (link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative py-3 text-sm font-bold uppercase tracking-[0.12em] transition hover:text-purple-400 ${
                    index === 0
                      ? "text-purple-400"
                      : "text-zinc-200"
                  }`}
                >
                  {link.label}

                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
                  )}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <button
              type="button"
              onClick={openFavorites}
              aria-label="Ouvrir les favoris"
              className="group flex items-center gap-2 text-zinc-200 transition hover:text-purple-400"
            >
              <Heart
                size={24}
                fill={
                  favoritesCount > 0
                    ? "currentColor"
                    : "none"
                }
                className={`transition group-hover:scale-110 ${
                  favoritesCount > 0
                    ? "text-purple-400"
                    : ""
                }`}
              />

              <span className="text-sm font-bold">
                {favoritesCount}
              </span>
            </button>

            <CartButton />

            <Link
              href={
                isLoggedIn
                  ? "/account"
                  : "/login"
              }
              className="flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wider transition hover:border-purple-500 hover:bg-purple-600 hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
            >
              <User size={18} />

              {isLoggedIn
                ? "Mon compte"
                : "Connexion"}
            </Link>
          </div>

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Fermer le menu"
                : "Ouvrir le menu"
            }
            onClick={() =>
              setMenuOpen(
                (current) => !current
              )
            }
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 lg:hidden"
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-black px-6 pb-8 pt-4 lg:hidden">
            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="border-b border-white/10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-zinc-200 transition hover:text-purple-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={openFavorites}
                aria-label="Ouvrir les favoris"
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border bg-white/5 ${
                  favoritesCount > 0
                    ? "border-purple-400 text-purple-400"
                    : "border-white/15"
                }`}
              >
                <Heart
                  size={21}
                  fill={
                    favoritesCount > 0
                      ? "currentColor"
                      : "none"
                  }
                />

                <span className="font-bold">
                  {favoritesCount}
                </span>
              </button>

              <div className="flex-1">
                <CartButton />
              </div>
            </div>

            <Link
              href={
                isLoggedIn
                  ? "/account"
                  : "/login"
              }
              onClick={() =>
                setMenuOpen(false)
              }
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-4 text-sm font-bold uppercase tracking-wider transition hover:bg-purple-500"
            >
              <User size={18} />

              {isLoggedIn
                ? "Mon compte"
                : "Connexion"}
            </Link>
          </div>
        )}
      </header>

      <FavoritesDrawer
        open={favoritesOpen}
        onClose={() =>
          setFavoritesOpen(false)
        }
      />
    </>
  );
}