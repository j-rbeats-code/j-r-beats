import {
  Headphones,
  Music2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-black px-8 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* TEXTE */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
              À propos
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
              L&apos;univers
              <span className="text-purple-400">
                {" "}J-R Beats
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-300">
              J-R Beats propose des instrumentales
              originales pensées pour les artistes,
              rappeurs, chanteurs et créateurs à la
              recherche d&apos;un son professionnel.
            </p>

            <p className="mt-5 max-w-xl leading-7 text-zinc-500">
              Choisis ton beat, sélectionne la licence
              adaptée à ton projet et reçois tes fichiers
              numériques après confirmation du paiement.
            </p>
          </div>

          {/* POINTS FORTS */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <Music2
                size={26}
                className="text-purple-400"
              />

              <h3 className="mt-5 text-lg font-black">
                Productions originales
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Des beats conçus pour donner une identité
                forte à tes projets.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <Headphones
                size={26}
                className="text-purple-400"
              />

              <h3 className="mt-5 text-lg font-black">
                Qualité professionnelle
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                MP3, WAV et pistes séparées selon la
                licence choisie.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <Zap
                size={26}
                className="text-purple-400"
              />

              <h3 className="mt-5 text-lg font-black">
                Livraison numérique
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Les fichiers disponibles avec ta licence
                sont accessibles après validation du
                paiement.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
              <ShieldCheck
                size={26}
                className="text-purple-400"
              />

              <h3 className="mt-5 text-lg font-black">
                Licences claires
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Plusieurs niveaux de licence selon les
                besoins de ton projet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}