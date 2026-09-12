"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [checking, setChecking] =
    useState(true);

  const [
    recoveryAllowed,
    setRecoveryAllowed,
  ] = useState(false);

  const [message, setMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function initializeRecovery() {
      try {
        const searchParams =
          new URLSearchParams(
            window.location.search
          );

        const hashParams =
          new URLSearchParams(
            window.location.hash.replace(
              /^#/,
              ""
            )
          );

        const code =
          searchParams.get("code");

        const type =
          hashParams.get("type");

        const accessToken =
          hashParams.get("access_token");

        const refreshToken =
          hashParams.get(
            "refresh_token"
          );

        /*
         * Format PKCE utilisé par les versions
         * récentes de Supabase :
         *
         * /reset-password?code=...
         */
        if (code) {
          const { error } =
            await supabase.auth.exchangeCodeForSession(
              code
            );

          if (!mounted) {
            return;
          }

          if (error) {
            setRecoveryAllowed(false);
            setChecking(false);
            return;
          }

          setRecoveryAllowed(true);
          setChecking(false);

          window.history.replaceState(
            {},
            "",
            window.location.pathname
          );

          return;
        }

        /*
         * Ancien format Supabase :
         *
         * #access_token=...
         * &refresh_token=...
         * &type=recovery
         */
        if (
          type === "recovery" &&
          accessToken &&
          refreshToken
        ) {
          const { error } =
            await supabase.auth.setSession({
              access_token:
                accessToken,
              refresh_token:
                refreshToken,
            });

          if (!mounted) {
            return;
          }

          if (error) {
            setRecoveryAllowed(false);
            setChecking(false);
            return;
          }

          setRecoveryAllowed(true);
          setChecking(false);

          window.history.replaceState(
            {},
            "",
            window.location.pathname
          );

          return;
        }

        setRecoveryAllowed(false);
        setChecking(false);
      } catch {
        if (!mounted) {
          return;
        }

        setRecoveryAllowed(false);
        setChecking(false);
      }
    }

    initializeRecovery();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (!recoveryAllowed) {
      setErrorMessage(
        "Le lien de réinitialisation est invalide ou a expiré."
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setErrorMessage(
        "Les deux mots de passe ne correspondent pas."
      );
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      setErrorMessage(
        "Impossible de modifier le mot de passe. Le lien a peut-être expiré."
      );

      setLoading(false);
      return;
    }

    await supabase.auth.signOut();

    setMessage(
      "Ton mot de passe a bien été modifié."
    );

    setLoading(false);

    setTimeout(() => {
      router.push("/login");
      router.refresh();
    }, 1500);
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <p className="text-zinc-400">
          Vérification du lien...
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
            J-R Beats
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            Nouveau mot de passe
          </h1>

          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Choisis un nouveau mot de passe pour ton compte.
          </p>
        </div>

        {!recoveryAllowed ? (
          <div className="mt-8 space-y-5">
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              Le lien de réinitialisation est invalide ou a expiré.
            </div>

            <Link
              href="/forgot-password"
              className="block w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-4 text-center font-black uppercase text-white transition hover:scale-[1.01]"
            >
              Demander un nouveau lien
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="password"
                className="text-sm font-bold text-zinc-300"
              >
                Nouveau mot de passe
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
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="text-sm font-bold text-zinc-300"
              >
                Confirmer le mot de passe
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                required
                minLength={6}
                autoComplete="new-password"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-purple-500"
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
                ? "Modification..."
                : "Modifier le mot de passe"}
            </button>
          </form>
        )}

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