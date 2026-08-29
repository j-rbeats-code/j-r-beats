import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Check,
  Clock3,
  Music2,
  SlidersHorizontal,
} from "lucide-react";

import AudioPlayer from "../../components/AudioPlayer";
import LicenseSelector from "../../components/LicenseSelector";
import { supabase } from "../../../lib/supabase";

type BeatPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Beat = {
  id: number;
  slug: string;
  title: string;
  image: string;
  audio: string;
  bpm: number;
  key_name: string;
  duration: string;
  style: string;
  description: string | null;
  price_mp3: number;
  price_wav: number;
  price_premium: number;
  price_exclusive: number;
  exclusive_sold: boolean;
};

export default async function BeatPage({
  params,
}: BeatPageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("beats")
    .select(`
      id,
      slug,
      title,
      image,
      audio,
      bpm,
      key_name,
      duration,
      style,
      description,
      price_mp3,
      price_wav,
      price_premium,
      price_exclusive,
      exclusive_sold
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Erreur Supabase :", error);
    notFound();
  }

  const beat = data as Beat;

  const licenses = [
    {
      name: "MP3" as const,
      price: `${Number(beat.price_mp3)
        .toFixed(2)
        .replace(".", ",")} €`,
      description: "Fichier MP3",
      features: [
        "MP3 haute qualité",
        "Licence standard",
      ],
    },
    {
      name: "WAV" as const,
      price: `${Number(beat.price_wav)
        .toFixed(2)
        .replace(".", ",")} €`,
      description: "Fichier WAV",
      features: [
        "WAV haute qualité",
        "Utilisation commerciale",
      ],
    },
    {
      name: "PREMIUM" as const,
      price: `${Number(beat.price_premium)
        .toFixed(2)
        .replace(".", ",")} €`,
      description: "Pistes séparées",
      features: [
        "MP3 + WAV",
        "Stems inclus",
      ],
    },
    {
      name: "EXCLUSIVE" as const,
      price: `${Number(beat.price_exclusive)
        .toFixed(2)
        .replace(".", ",")} €`,
      description: "Exclusivité totale",
      features: [
        "Tous les fichiers",
        "Retrait de la boutique",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* FOND */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/beat-page-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="fixed inset-0 z-10 bg-black/20" />

      <div className="fixed inset-0 z-20 bg-gradient-to-r from-black/50 via-black/20 to-black/30" />

      <div className="pointer-events-none fixed left-[8%] top-[20%] z-20 h-[520px] w-[520px] rounded-full bg-purple-700/20 blur-[150px]" />

      <div className="pointer-events-none fixed bottom-[5%] right-[8%] z-20 h-[480px] w-[480px] rounded-full bg-fuchsia-600/10 blur-[160px]" />

      {/* CONTENU */}
      <div className="relative z-30 mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
        <Link
          href="/#beats"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-300 transition hover:text-purple-400"
        >
          <ArrowLeft size={18} />
          Retour aux beats
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* COLONNE GAUCHE */}
          <div>
            <div className="relative">
              <div className="absolute -inset-12 -z-10 h-[550px] w-[550px] rounded-full bg-purple-600/25 blur-[140px]" />

              <div className="absolute -left-24 -top-24 -z-10 h-[700px] w-[700px] rounded-full bg-purple-500/30 blur-[180px]" />

              <div className="absolute -right-20 bottom-0 -z-10 h-[350px] w-[350px] rounded-full bg-pink-500/20 blur-[120px]" />

              <div
                className={`relative aspect-square overflow-hidden rounded-3xl border bg-black/20 transition-all duration-500 ${
                  beat.exclusive_sold
                    ? "border-red-500/40 shadow-[0_40px_120px_rgba(127,29,29,0.35)]"
                    : "border-purple-400/30 shadow-[0_40px_120px_rgba(147,51,234,0.45)] hover:-translate-y-3 hover:scale-[1.02]"
                }`}
              >
                <Image
                  src={beat.image}
                  alt={beat.title}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className={`object-cover transition duration-700 ${
                    beat.exclusive_sold
                      ? "grayscale"
                      : "hover:scale-105"
                  }`}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {beat.exclusive_sold && (
                  <div className="absolute left-5 top-5 rounded-full border border-red-400/40 bg-red-950/85 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-red-300 backdrop-blur-md">
                    EXCLUSIVE SOLD
                  </div>
                )}
              </div>
            </div>

            <AudioPlayer
              src={beat.audio}
              title={beat.title}
            />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                <Music2
                  size={18}
                  className="mb-3 text-purple-400"
                />

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  BPM
                </p>

                <p className="mt-1 font-black text-white">
                  {beat.bpm} BPM
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                <SlidersHorizontal
                  size={18}
                  className="mb-3 text-purple-400"
                />

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Tonalité
                </p>

                <p className="mt-1 font-black text-white">
                  {beat.key_name}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                <Clock3
                  size={18}
                  className="mb-3 text-purple-400"
                />

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Durée
                </p>

                <p className="mt-1 font-black text-white">
                  {beat.duration}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                <Music2
                  size={18}
                  className="mb-3 text-purple-400"
                />

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Style
                </p>

                <p className="mt-1 font-black text-white">
                  {beat.style}
                </p>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div
            className={`rounded-[32px] border p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-[24px] md:p-10 ${
              beat.exclusive_sold
                ? "border-red-500/30 bg-red-950/10"
                : "border-white/15 bg-white/5"
            }`}
          >
            <p className="text-sm font-black uppercase tracking-[0.4em] text-purple-400">
              J-R Beats
            </p>

            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl">
              {beat.title}
            </h1>

            <p className="mt-4 text-xl font-black text-purple-300">
              {beat.style}
            </p>

            <p className="mt-8 max-w-xl leading-8 text-zinc-300">
              {beat.description ??
                "Une production originale J-R Beats."}
            </p>

            {/* CARACTÉRISTIQUES */}
            <div className="mt-9">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-400">
                Caractéristiques
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  "WAV haute qualité",
                  "Fichier MP3 inclus",
                  "Licence commerciale",
                  "Livraison immédiate",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-400">
                      <Check size={15} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ACHAT / VENDU */}
            {beat.exclusive_sold ? (
              <div className="mt-10 rounded-2xl border border-red-500/30 bg-red-950/30 p-6">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-red-300">
                  Statut
                </p>

                <p className="mt-3 text-3xl font-black uppercase text-red-400">
                  Vendu en exclusivité
                </p>

                <p className="mt-4 leading-7 text-zinc-300">
                  Ce beat a déjà été vendu avec une licence EXCLUSIVE
                  et n&apos;est plus disponible à l&apos;achat.
                </p>
              </div>
            ) : (
              <LicenseSelector
                beatSlug={beat.slug}
                beatTitle={beat.title}
                licenses={licenses}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}