"use client";

import {
  FormEvent,
  useState,
} from "react";
import Link from "next/link";

import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const redirectTo =
      `${window.location.origin}/reset-password`;

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo,
        }
      );

    if (error) {
      setErrorMessage(
        "Impossible d'envoyer l'e-mail de réinitialisation."
      );

      setLoading(false);
      return;
    }

    setMessage(
      "Si un compte existe avec cette adresse, un e-mail de réinitialisation a été envoyé."
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
            Mot de passe oublié
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Entre ton adresse e-mail pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
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
                setEmail(
                  event.target.value
                )
              }
              required
              autoComplete="email"
              placeholder="ton@email.com"
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
              ? "Envoi..."
              : "Envoyer le lien"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-sm font-bold text-zinc-400 transition hover:text-purple-400"
          >
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </main>
  );
}