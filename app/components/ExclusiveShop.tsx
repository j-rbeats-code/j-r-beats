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

export default async function ExclusiveShop() {
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
      price_mp3,
      exclusive_sold
    `)
    .eq("exclusive_sold", false)
    .order("id", { ascending: true });

  if (error) {
    console.error(
      "Erreur Supabase ExclusiveShop :",
      error
    );

    return (
      <section
        id="exclusive"
        className="px-8 py-24"
      >
        <p className="text-center text-red-400">
          Impossible de charger les beats exclusifs.
        </p>
      </section>
    );
  }

  const beats = (data ?? []) as Beat[];

  return (
    <section
      id="exclusive"
      className="border-y border-white/10 bg-zinc-950/70 px-8 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-lg font-bold uppercase tracking-[0.4em] text-purple-400">
          Exclusif
        </p>

        <h2 className="mt-4 text-center text-5xl font-black">
          Beats disponibles en exclusivité
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center leading-7 text-zinc-400">
          Achète la licence EXCLUSIVE d&apos;un beat
          disponible. Après paiement confirmé, il est
          retiré des nouvelles ventes.
        </p>

        {beats.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-white/10 bg-black/40 p-10 text-center">
            <p className="text-xl font-black text-white">
              Aucun beat exclusif disponible
            </p>

            <p className="mt-3 text-sm text-zinc-500">
              De nouvelles productions arriveront bientôt.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {beats.map((beat) => (
              <BeatCard
                key={beat.id}
                slug={beat.slug}
                title={beat.title}
                price={`${Number(
                  beat.price_mp3
                )
                  .toFixed(2)
                  .replace(".", ",")} €`}
                image={beat.image}
                bpm={`${beat.bpm} BPM`}
                keyName={beat.key_name}
                duration={beat.duration}
                exclusiveSold={
                  beat.exclusive_sold
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}