import BeatCard from "./BeatCard";
import { supabase } from "../../lib/supabase";

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
  price_mp3: number;
  exclusive_sold: boolean;
};

export default async function BeatShop() {
  const { data, error } = await supabase
    .from("beats")
    .select(
      `
      id,
      slug,
      title,
      image,
      audio,
      bpm,
      key_name,
      duration,
      style,
      price_mp3,
      exclusive_sold
      `
    )
    .order("id", { ascending: true });

  if (error) {
    console.error("Erreur Supabase :", error);

    return (
      <section className="px-8 py-24">
        <p className="text-center text-red-400">
          Impossible de charger les beats.
        </p>
      </section>
    );
  }

  const beats = (data ?? []) as Beat[];

  return (
    <section
      id="beats"
      className="px-8 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-lg uppercase tracking-[0.4em] text-purple-400">
          Boutique
        </p>

        <h2 className="mt-4 text-center text-5xl font-black">
          Derniers Beats
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-gray-400">
          Des instrumentales professionnelles prêtes pour tes projets.
        </p>

        {beats.length === 0 ? (
          <p className="mt-14 text-center text-zinc-400">
            Aucun beat disponible pour le moment.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {beats.map((beat) => (
              <BeatCard
                key={beat.id}
                slug={beat.slug}
                title={beat.title}
                price={`${Number(beat.price_mp3)
                  .toFixed(2)
                  .replace(".", ",")} €`}
                image={beat.image}
                bpm={`${beat.bpm} BPM`}
                keyName={beat.key_name}
                duration={beat.duration}
                exclusiveSold={beat.exclusive_sold}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}