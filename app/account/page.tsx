"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "../../lib/supabase";
import AccountLicenses from "../components/AccountLicenses";
import AccountDownloads from "../components/AccountDownloads";

type OrderItem = {
  slug?: string;
  title?: string;
  license?: string;
  price?: number;
};

type Order = {
  id: number;
  created_at: string;
  stripe_session_id: string;
  customer_email: string | null;
  amount_total: number | null;
  currency: string | null;
  payment_status: string | null;
  items: OrderItem[] | null;
  digital_content_accepted: boolean | null;
  license_accepted: boolean | null;
  license_name: string | null;
};

export default function AccountPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState<string | null>(null);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [ordersError, setOrdersError] =
    useState("");

  useEffect(() => {
    async function loadAccount() {
      setLoading(true);
      setOrdersError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.push("/login");
        return;
      }

      const userEmail =
        user.email ?? null;

      setEmail(userEmail);

      const {
        data,
        error,
      } = await supabase
        .from("orders")
        .select(`
          id,
          created_at,
          stripe_session_id,
          customer_email,
          amount_total,
          currency,
          payment_status,
          items,
          digital_content_accepted,
          license_accepted,
          license_name
        `)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Erreur chargement commandes :",
          error
        );

        setOrdersError(
          "Impossible de charger tes commandes."
        );

        setOrders([]);
        setLoading(false);
        return;
      }

      setOrders(
        (data ?? []) as Order[]
      );

      setLoading(false);
    }

    loadAccount();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  function formatPrice(
    amount: number | null,
    currency: string | null
  ) {
    const value =
      Number(amount ?? 0);

    const currencyCode =
      (currency ?? "EUR").toUpperCase();

    return new Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: currencyCode,
      }
    ).format(value);
  }

  function formatDate(
    value: string
  ) {
    return new Intl.DateTimeFormat(
      "fr-FR",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(
      new Date(value)
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <p className="text-zinc-400">
          Chargement du compte...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-zinc-950 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.35em] text-purple-400">
              J-R Beats
            </p>

            <h1 className="mt-3 text-4xl font-black uppercase">
              Mon compte
            </h1>

            <p className="mt-4 text-zinc-400">
              Connecté avec :
            </p>

            <p className="mt-1 font-bold text-white">
              {email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-bold text-white transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            Se déconnecter
          </button>
        </div>

        <div className="mt-8">
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                  Commandes
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Mes achats
                </h2>
              </div>

              <p className="text-sm text-zinc-500">
                {orders.length} commande
                {orders.length > 1
                  ? "s"
                  : ""}
              </p>
            </div>

            {ordersError && (
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {ordersError}
              </div>
            )}

            {!ordersError &&
              orders.length === 0 && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-400">
                  Aucune commande trouvée pour
                  ce compte.
                </div>
              )}

            {!ordersError &&
              orders.length > 0 && (
                <div className="mt-6 space-y-4">
                  {orders.map((order) => (
                    <article
                      key={order.id}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            Commande #{order.id}
                          </p>

                          <p className="mt-2 text-sm text-zinc-400">
                            {formatDate(
                              order.created_at
                            )}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-2xl font-black text-purple-400">
                            {formatPrice(
                              order.amount_total,
                              order.currency
                            )}
                          </p>

                          <span
                            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase ${
                              order.payment_status ===
                              "paid"
                                ? "bg-green-500/10 text-green-300"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            {order.payment_status ??
                              "inconnu"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3">
                        {(order.items ?? []).map(
                          (item, index) => (
                            <div
                              key={`${order.id}-${item.slug ?? "item"}-${index}`}
                              className="rounded-xl border border-white/10 bg-zinc-950 p-4"
                            >
                              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="font-black text-white">
                                    {item.title ??
                                      item.slug ??
                                      "Beat"}
                                  </p>

                                  <p className="mt-1 text-sm text-zinc-400">
                                    Licence{" "}
                                    {item.license ??
                                      order.license_name ??
                                      "—"}
                                  </p>
                                </div>

                                {typeof item.price ===
                                  "number" && (
                                  <p className="font-black text-purple-400">
                                    {formatPrice(
                                      item.price,
                                      order.currency
                                    )}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2 text-xs">
                        {order.license_accepted && (
                          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-green-300">
                            Licence acceptée
                          </span>
                        )}

                        {order.digital_content_accepted && (
                          <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-green-300">
                            Contenu numérique accepté
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <AccountLicenses
            orders={orders}
          />

          <AccountDownloads
            orders={orders}
          />
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-3 font-black uppercase text-white transition hover:scale-[1.02]"
          >
            Retour à l&apos;accueil
          </Link>
        </div>

      </div>
    </main>
  );
}