"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const benefits = [
  {
    icon: Headphones,
    title: "Qualité premium",
    text: "Instrumentales professionnelles",
  },
  {
    icon: Sparkles,
    title: "Identité unique",
    text: "Des productions originales",
  },
  {
    icon: FileText,
    title: "Livraison immédiate",
    text: "Fichiers disponibles après achat",
  },
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    text: "Commandes protégées",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100vh-112px)] overflow-hidden bg-black text-white">
      <Image
        src="/images/hero-bg.png"
        alt="Univers visuel J-R Beats"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />

      <div className="absolute left-[-100px] top-1/3 h-96 w-96 rounded-full bg-purple-700/20 blur-[140px]" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-orange-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-112px)] max-w-7xl items-center px-6 pb-44 pt-12 md:px-10 lg:px-16">
        <div className="max-w-2xl">
         

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative -ml-10 -mt-8 h-[360px] w-[460px] sm:h-[450px] sm:w-[570px] lg:h-[560px] lg:w-[700px]"
          >
            <Image
              src="/images/logo-jr-beats-transparent.png"
              alt="J-R Beats"
              fill
              priority
              sizes="(max-width: 640px) 290px, (max-width: 1024px) 350px, 410px"
              className="object-contain object-left drop-shadow-[0_0_22px_rgba(255,255,255,0.18)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="-mt-10"
          >
            <h2 className="text-2xl font-black uppercase tracking-wide sm:text-3xl lg:text-4xl">
              Dark melodic beats
            </h2>

            <p className="mt-2 text-2xl font-black uppercase tracking-wide text-purple-400 sm:text-3xl lg:text-4xl">
              Pour artistes sérieux
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-7 text-zinc-300 md:text-lg"
          >
            Des instrumentales sombres, mélodiques et puissantes pour donner
            une véritable identité à tes projets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#beats"
              className="group flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-purple-700 to-purple-500 px-8 py-4 font-bold uppercase shadow-[0_0_35px_rgba(147,51,234,0.3)] transition hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(147,51,234,0.55)]"
            >
              Écouter les beats
              <ArrowRight
                size={19}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href="#licenses"
              className="flex items-center justify-center gap-3 rounded-lg border border-white/30 bg-black/30 px-8 py-4 font-bold uppercase backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-600/20"
            >
              <FileText size={19} />
              Voir les licences
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-300"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-purple-400" />
              Beats premium
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-purple-400" />
              Livraison immédiate
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-purple-400" />
              Licences professionnelles
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-20 w-full px-4 pb-5 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-black/75 backdrop-blur-xl md:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex min-h-28 items-center gap-4 border-white/10 px-4 py-5 odd:border-r md:border-r md:px-6 md:last:border-r-0"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600/15 text-purple-400">
                  <Icon size={25} />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase">
                    {benefit.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-400">
                    {benefit.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}