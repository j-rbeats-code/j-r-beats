"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import { supabase } from "../../lib/supabase";

type OrderItem = {
  slug?: string;
  title?: string;
  license?: string;
  price?: number;
};

type Order = {
  id: number;
  items: OrderItem[] | null;
  license_name: string | null;
};

type AccountDownloadsProps = {
  orders: Order[];
};

type DownloadType =
  | "mp3-tagged"
  | "mp3-untagged"
  | "wav-tagged"
  | "wav-untagged"
  | "stems";

type DownloadRequest = {
  orderId: number;
  slug: string;
  type: DownloadType;
};

export default function AccountDownloads({
  orders,
}: AccountDownloadsProps) {
  const [loadingKey, setLoadingKey] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  async function handleDownload({
    orderId,
    slug,
    type,
  }: DownloadRequest) {
    setErrorMessage("");

    const requestKey =
      `${orderId}-${slug}-${type}`;

    setLoadingKey(requestKey);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !session?.access_token
      ) {
        setErrorMessage(
          "Ta session a expiré. Reconnecte-toi."
        );

        setLoadingKey(null);
        return;
      }

      const response = await fetch(
        "/api/account/download",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            orderId,
            slug,
            type,
          }),
        }
      );

      const data =
        (await response.json()) as {
          url?: string;
          error?: string;
        };

      if (
        !response.ok ||
        !data.url
      ) {
        setErrorMessage(
          data.error ??
            "Impossible de générer le téléchargement."
        );

        setLoadingKey(null);
        return;
      }

      window.open(
        data.url,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      console.error(
        "Erreur téléchargement compte :",
        error
      );

      setErrorMessage(
        "Une erreur est survenue pendant le téléchargement."
      );
    } finally {
      setLoadingKey(null);
    }
  }

  const purchasedItems =
    orders.flatMap((order) => {
      const items =
        order.items ?? [];

      return items
        .filter(
          (
            item
          ): item is OrderItem & {
            slug: string;
            license: string;
          } =>
            Boolean(
              item.slug &&
                item.license
            )
        )
        .map((item) => ({
          orderId: order.id,
          slug: item.slug,
          title:
            item.title ??
            item.slug,
          license:
            item.license,
        }));
    });

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
          Téléchargements
        </p>

        <h2 className="mt-2 text-2xl font-black">
          Mes fichiers
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Génère un nouveau lien privé à
          chaque téléchargement.
        </p>
      </div>

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      {purchasedItems.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-400">
          Aucun fichier disponible pour ce
          compte.
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {purchasedItems.map(
            (item, index) => {
              const canDownloadWav =
                [
                  "WAV",
                  "PREMIUM",
                  "EXCLUSIVE",
                ].includes(
                  item.license
                );

              const canDownloadStems =
                [
                  "PREMIUM",
                  "EXCLUSIVE",
                ].includes(
                  item.license
                );

              const baseKey =
                `${item.orderId}-${item.slug}-${index}`;

              return (
                <div
                  key={baseKey}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Commande #
                    {item.orderId}
                  </p>

                  <p className="mt-2 font-black text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-purple-300">
                    Licence{" "}
                    {item.license}
                  </p>

                  <div className="mt-5 space-y-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleDownload({
                          orderId:
                            item.orderId,
                          slug:
                            item.slug,
                          type:
                            "mp3-tagged",
                        })
                      }
                      disabled={
                        loadingKey ===
                        `${item.orderId}-${item.slug}-mp3-tagged`
                      }
                      className="flex w-full items-center justify-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 font-bold text-purple-300 transition hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Download
                        size={18}
                      />

                      {loadingKey ===
                      `${item.orderId}-${item.slug}-mp3-tagged`
                        ? "Préparation..."
                        : "MP3 avec tag J-R Beats"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDownload({
                          orderId:
                            item.orderId,
                          slug:
                            item.slug,
                          type:
                            "mp3-untagged",
                        })
                      }
                      disabled={
                        loadingKey ===
                        `${item.orderId}-${item.slug}-mp3-untagged`
                      }
                      className="flex w-full items-center justify-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 font-bold text-purple-300 transition hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Download
                        size={18}
                      />

                      {loadingKey ===
                      `${item.orderId}-${item.slug}-mp3-untagged`
                        ? "Préparation..."
                        : "MP3 sans tag"}
                    </button>

                    {canDownloadWav && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload({
                              orderId:
                                item.orderId,
                              slug:
                                item.slug,
                              type:
                                "wav-tagged",
                            })
                          }
                          disabled={
                            loadingKey ===
                            `${item.orderId}-${item.slug}-wav-tagged`
                          }
                          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-bold text-white transition hover:border-purple-500/40 hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Download
                            size={18}
                          />

                          {loadingKey ===
                          `${item.orderId}-${item.slug}-wav-tagged`
                            ? "Préparation..."
                            : "WAV 24-bit avec tag"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDownload({
                              orderId:
                                item.orderId,
                              slug:
                                item.slug,
                              type:
                                "wav-untagged",
                            })
                          }
                          disabled={
                            loadingKey ===
                            `${item.orderId}-${item.slug}-wav-untagged`
                          }
                          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-bold text-white transition hover:border-purple-500/40 hover:bg-purple-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Download
                            size={18}
                          />

                          {loadingKey ===
                          `${item.orderId}-${item.slug}-wav-untagged`
                            ? "Préparation..."
                            : "WAV 24-bit sans tag"}
                        </button>
                      </>
                    )}

                    {canDownloadStems && (
                      <button
                        type="button"
                        onClick={() =>
                          handleDownload({
                            orderId:
                              item.orderId,
                            slug:
                              item.slug,
                            type:
                              "stems",
                          })
                        }
                        disabled={
                          loadingKey ===
                          `${item.orderId}-${item.slug}-stems`
                        }
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-3 font-bold text-fuchsia-300 transition hover:bg-fuchsia-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Download
                          size={18}
                        />

                        {loadingKey ===
                        `${item.orderId}-${item.slug}-stems`
                          ? "Préparation..."
                          : "STEMS / pistes séparées"}
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}