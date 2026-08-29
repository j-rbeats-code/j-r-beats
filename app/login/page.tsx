"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setErrorMessage(
        "Impossible de se connecter. Vérifie ton e-mail et ton mot de passe."
      );

      setLoading(false);
      return;
    }

    setMessage("Connexion réussie.");

    router.push("/account");
    router.refresh();
  }

  async function handleSignup() {
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      setErrorMessage(
        "Impossible de créer le compte."
      );

      setLoading(false);
      return;
    }

    setMessage(
      "Compte créé. Vérifie ton e-mail si Supabase demande une confirmation."
    );

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
            J-R Beats
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            Connexion
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Connecte-toi pour retrouver tes
            commandes, licences et
            téléchargements.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="text-sm font-bold text-zinc-300"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              placeholder="ton@email.com"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-zinc-300"
            >
              Mot de passe
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              required
              minLength={6}
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
            />
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-4 font-black uppercase text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Connexion..."
              : "Se connecter"}
          </button>

          <button
            type="button"
            disabled={
              loading ||
              !email ||
              password.length < 6
            }
            onClick={handleSignup}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-black uppercase text-white transition hover:border-purple-500/40 hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Créer un compte
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-bold text-zinc-400 transition hover:text-purple-400"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}