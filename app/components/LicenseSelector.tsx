"use client";

import {
  Check,
  FileText,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  LicenseType,
  useCart,
} from "../context/CartContext";

import {
  mp3License,
  wavLicense,
  premiumLicense,
  exclusiveLicense,
} from "../api/webhook/licenses";

type License = {
  name: LicenseType;
  price: string;
  description: string;
  features: string[];
};

type LicenseSelectorProps = {
  beatSlug: string;
  beatTitle: string;
  licenses: License[];
};

export default function LicenseSelector({
  beatSlug,
  beatTitle,
  licenses,
}: LicenseSelectorProps) {
  const { addToCart } = useCart();

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [contractOpen, setContractOpen] =
    useState(false);

  const [licenseAccepted, setLicenseAccepted] =
    useState(false);

  const selectedLicense =
    licenses[selectedIndex];

  function priceToNumber(price: string) {
    return Number(
      price
        .replace("€", "")
        .replace(",", ".")
        .trim()
    );
  }

  function getContract(
    license: LicenseType
  ) {
    switch (license) {
      case "MP3":
        return mp3License;

      case "WAV":
        return wavLicense;

      case "PREMIUM":
        return premiumLicense;

      case "EXCLUSIVE":
        return exclusiveLicense;

      default:
        return mp3License;
    }
  }

  const selectedContract =
    getContract(selectedLicense.name);

  function handleSelectLicense(
    index: number
  ) {
    setSelectedIndex(index);
    setLicenseAccepted(false);
  }

  function handleAddToCart() {
    if (!licenseAccepted) {
      return;
    }

    addToCart({
      slug: beatSlug,
      title: beatTitle,
      license: selectedLicense.name,
      price: priceToNumber(
        selectedLicense.price
      ),
      licenseAccepted: true,
    });
  }

  return (
    <>
      <div className="mt-10">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
          Choisir une licence
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {licenses.map((license, index) => {
            const selected =
              selectedIndex === index;

            return (
              <button
                key={license.name}
                type="button"
                onClick={() =>
                  handleSelectLicense(index)
                }
                className={`relative rounded-2xl border p-4 text-left transition duration-300 hover:-translate-y-1 ${
                  selected
                    ? "border-purple-400 bg-purple-600/20 shadow-[0_0_35px_rgba(168,85,247,0.25)]"
                    : "border-white/10 bg-black/40 hover:border-purple-500/50"
                }`}
              >
                {selected && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white">
                    <Check size={14} />
                  </span>
                )}

                <p className="font-black uppercase text-white">
                  {license.name}
                </p>

                <p className="mt-3 text-2xl font-black text-purple-400">
                  {license.price}
                </p>

                <p className="mt-3 text-xs leading-5 text-zinc-400">
                  {license.description}
                </p>

                <div className="mt-5 space-y-2">
                  {license.features.map(
                    (feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-[11px] text-zinc-400"
                      >
                        <Check
                          size={12}
                          className="mt-0.5 shrink-0 text-purple-400"
                        />

                        <span>
                          {feature}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-4 rounded-xl border border-white/10 bg-black/30 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Licence sélectionnée
              </p>

              <p className="mt-1 font-black uppercase">
                {selectedLicense.name}
              </p>
            </div>

            <p className="text-2xl font-black text-purple-400">
              {selectedLicense.price}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setContractOpen(true)
            }
            className="mt-4 flex items-center gap-2 text-sm font-bold text-purple-300 transition hover:text-purple-200"
          >
            <FileText size={16} />
            Voir le contrat de licence
          </button>
        </div>

        <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={licenseAccepted}
              onChange={(event) =>
                setLicenseAccepted(
                  event.target.checked
                )
              }
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-purple-600"
            />

            <span className="text-sm leading-6 text-zinc-300">
              J&apos;ai lu et j&apos;accepte
              le contrat de licence{" "}
              <strong className="text-white">
                {selectedLicense.name}
              </strong>{" "}
              applicable à cet achat.
            </span>
          </label>

          {!licenseAccepted && (
            <p className="mt-3 pl-8 text-xs text-zinc-500">
              L&apos;acceptation de la
              licence est obligatoire avant
              l&apos;ajout au panier.
            </p>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!licenseAccepted}
            className={`flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 font-black uppercase text-white transition ${
              licenseAccepted
                ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:scale-[1.02]"
                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            }`}
          >
            <ShoppingCart size={20} />

            {licenseAccepted
              ? "Ajouter au panier"
              : "Accepter la licence"}
          </button>
        </div>
      </div>

      {contractOpen && (
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
                  setContractOpen(false)
                }
                aria-label="Fermer le contrat"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-purple-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 md:px-8">
              <div className="mb-6 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
                  Beat
                </p>

                <p className="mt-2 text-xl font-black text-white">
                  {beatTitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-bold text-zinc-300">
                    {selectedContract.name}
                  </span>

                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-black text-purple-300">
                    {selectedLicense.price}
                  </span>
                </div>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
                {selectedContract.contract}
              </pre>
            </div>

            <div className="border-t border-white/10 bg-black/30 px-6 py-4 md:px-8">
              <button
                type="button"
                onClick={() =>
                  setContractOpen(false)
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