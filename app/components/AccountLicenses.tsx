"use client";

import { useState } from "react";
import {
  FileText,
  X,
} from "lucide-react";

import {
  mp3License,
  wavLicense,
  premiumLicense,
  exclusiveLicense,
} from "../api/webhook/licenses";

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

type AccountLicensesProps = {
  orders: Order[];
};

type LicenseName =
  | "MP3"
  | "WAV"
  | "PREMIUM"
  | "EXCLUSIVE";

const contracts = {
  MP3: mp3License,
  WAV: wavLicense,
  PREMIUM: premiumLicense,
  EXCLUSIVE: exclusiveLicense,
};

export default function AccountLicenses({
  orders,
}: AccountLicensesProps) {
  const [selectedLicense, setSelectedLicense] =
    useState<LicenseName | null>(null);

  const purchasedLicenses =
    orders.flatMap((order) => {
      const orderItems = order.items ?? [];

      if (orderItems.length > 0) {
        return orderItems
          .filter((item) =>
            [
              "MP3",
              "WAV",
              "PREMIUM",
              "EXCLUSIVE",
            ].includes(item.license ?? "")
          )
          .map((item) => ({
            orderId: order.id,
            title:
              item.title ??
              item.slug ??
              "Beat",
            license:
              item.license as LicenseName,
          }));
      }

      if (
        order.license_name &&
        [
          "MP3",
          "WAV",
          "PREMIUM",
          "EXCLUSIVE",
        ].includes(order.license_name)
      ) {
        return [
          {
            orderId: order.id,
            title: "Beat",
            license:
              order.license_name as LicenseName,
          },
        ];
      }

      return [];
    });

  const selectedContract =
    selectedLicense
      ? contracts[selectedLicense]
      : null;

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 md:p-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
            Licences
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Mes contrats
          </h2>
        </div>

        {purchasedLicenses.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-zinc-400">
            Aucun contrat disponible pour ce
            compte.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {purchasedLicenses.map(
              (item, index) => (
                <div
                  key={`${item.orderId}-${item.license}-${index}`}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Commande #{item.orderId}
                  </p>

                  <p className="mt-2 font-black text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-purple-300">
                    Licence {item.license}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedLicense(
                        item.license
                      )
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-bold text-purple-300 transition hover:bg-purple-500/20"
                  >
                    <FileText size={16} />
                    Voir le contrat
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {selectedContract && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                  J-R Beats
                </p>

                <h2 className="mt-2 text-xl font-black uppercase text-white md:text-2xl">
                  {selectedContract.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedLicense(null)
                }
                aria-label="Fermer le contrat"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-purple-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8">
              <div className="mb-6 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
                <p className="text-sm font-black text-white">
                  {selectedContract.name}
                </p>

                <p className="mt-2 text-2xl font-black text-purple-400">
                  {selectedContract.price
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </p>

                <p className="mt-3 text-sm text-zinc-400">
                  {
                    selectedContract.shortDescription
                  }
                </p>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
                {selectedContract.contract}
              </pre>
            </div>

            <div className="border-t border-white/10 bg-black/30 px-6 py-4 md:px-8">
              <button
                type="button"
                onClick={() =>
                  setSelectedLicense(null)
                }
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 py-3 font-black uppercase text-white transition hover:scale-[1.01]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}