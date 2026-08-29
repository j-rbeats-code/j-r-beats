"use client";

import { useState } from "react";
import {
  FileText,
  X,
} from "lucide-react";

import LicenseCard from "./LicenseCard";

import {
  mp3License,
  wavLicense,
  premiumLicense,
  exclusiveLicense,
} from "../api/webhook/licenses";

type LicenseName =
  | "MP3"
  | "WAV"
  | "PREMIUM"
  | "EXCLUSIVE";

const licenseContracts = {
  MP3: mp3License,
  WAV: wavLicense,
  PREMIUM: premiumLicense,
  EXCLUSIVE: exclusiveLicense,
};

export default function LicenseShop() {
  const [selectedLicense, setSelectedLicense] =
    useState<LicenseName | null>(null);

  const licenses = [
    {
      name: "MP3" as const,
      price: "9,99 €",
      description:
        "Fichier MP3 haute qualité avec licence standard.",
    },
    {
      name: "WAV" as const,
      price: "19,99 €",
      description:
        "MP3 + WAV 24-bit haute qualité pour une utilisation commerciale.",
      popular: true,
    },
    {
      name: "PREMIUM" as const,
      price: "29,99 €",
      description:
        "MP3 + WAV 24-bit + STEMS / pistes séparées.",
    },
    {
      name: "EXCLUSIVE" as const,
      price: "49,99 €",
      description:
        "Tous les fichiers avec licence exclusive et retrait du beat de la vente.",
    },
  ];

  const contract = selectedLicense
    ? licenseContracts[selectedLicense]
    : null;

  return (
    <>
      <section
        id="licenses"
        className="px-8 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm uppercase tracking-[0.4em] text-purple-400">
            Licences
          </p>

          <h2 className="mt-4 text-center text-5xl font-black">
            Choisis ton offre
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {licenses.map((license) => (
              <LicenseCard
                key={license.name}
                name={license.name}
                price={license.price}
                description={
                  license.description
                }
                popular={license.popular}
                onViewLicense={() =>
                  setSelectedLicense(
                    license.name
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {contract && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">
                  J-R Beats
                </p>

                <h2 className="mt-2 text-xl font-black uppercase text-white md:text-2xl">
                  {contract.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedLicense(null)
                }
                aria-label="Fermer la licence"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-purple-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8">
              <div className="mb-6 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
                <div className="flex items-center gap-3">
                  <FileText
                    size={20}
                    className="text-purple-300"
                  />

                  <p className="font-black uppercase text-white">
                    {contract.name}
                  </p>
                </div>

                <p className="mt-3 text-2xl font-black text-purple-400">
                  {contract.price
                    .toFixed(2)
                    .replace(".", ",")}{" "}
                  €
                </p>

                <p className="mt-3 text-sm text-zinc-400">
                  {
                    contract.shortDescription
                  }
                </p>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
                {contract.contract}
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