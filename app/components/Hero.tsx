export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-950 via-black to-black" />

      <div className="max-w-5xl">

        <p className="mb-6 text-sm uppercase tracking-[0.5em] text-purple-400">
          J-R Beats Studio
        </p>

        <h1 className="text-6xl font-black leading-tight md:text-8xl">
          Le son qui donne
          <br />
          <span className="text-purple-500">
            une identité
          </span>
          à tes projets
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
          Instrumentales professionnelles, productions originales
          et licences adaptées aux artistes ambitieux.
        </p>

        <div className="mt-10 flex justify-center gap-5">

          <button className="rounded-full bg-purple-600 px-8 py-4 font-bold hover:bg-purple-700">
            Écouter les beats
          </button>

          <button className="rounded-full border border-white/30 px-8 py-4 font-bold hover:bg-white hover:text-black">
            Découvrir la boutique
          </button>

        </div>

      </div>

    </section>
  );
}