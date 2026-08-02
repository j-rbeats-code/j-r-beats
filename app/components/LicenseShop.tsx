import LicenseCard from "./LicenseCard";

export default function LicenseShop() {

  const licenses = [
    {
      name: "MP3 Lease",
      price: "19,99 €",
      description: "Parfait pour débuter avec une utilisation personnelle.",
    },
    {
      name: "WAV Lease",
      price: "39,99 €",
      description: "Qualité studio avec fichier WAV haute définition.",
      popular: true,
    },
    {
      name: "Unlimited",
      price: "99,99 €",
      description: "Utilisation commerciale étendue pour tes projets.",
    },
    {
      name: "Exclusive",
      price: "299 €",
      description: "Le beat devient exclusivement à toi.",
    },
  ];


  return (
    <section className="px-8 py-24">

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
              description={license.description}
              popular={license.popular}
            />
          ))}

        </div>

      </div>

    </section>
  );
}