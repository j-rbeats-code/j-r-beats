import BeatCard from "./BeatCard";

export default function BeatShop() {

  const beats = [
    {
      title: "Dark City",
      price: "29,99 €",
      image: "/images/dark-city.jpg",
      bpm: "140 BPM",
      key: "Cm",
      duration: "2:48",
    },
    {
      title: "Midnight Flow",
      price: "39,99 €",
      image: "/images/midnight-flow.jpg",
      bpm: "128 BPM",
      key: "Am",
      duration: "3:12",
    },
    {
      title: "Street Legend",
      price: "59,99 €",
      image: "/images/street-legend.jpg",
      bpm: "150 BPM",
      key: "Dm",
      duration: "2:56",
    },
  ];


  return (
    <section className="px-8 py-24">

      <div className="mx-auto max-w-6xl">

        <p className="text-center text-sm uppercase tracking-[0.4em] text-purple-400">
          Boutique
        </p>

        <h2 className="mt-4 text-center text-5xl font-black">
          Derniers Beats
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-gray-400">
          Des instrumentales professionnelles prêtes pour tes projets.
        </p>


        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {beats.map((beat) => (

            <BeatCard
              key={beat.title}
              title={beat.title}
              price={beat.price}
              image={beat.image}
              bpm={beat.bpm}
              keyName={beat.key}
              duration={beat.duration}
            />

          ))}

        </div>

      </div>

    </section>
  );
}