import CartButton from "./CartButton";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-white/10 px-8 py-6">

      <div>
        <h1 className="text-3xl font-black tracking-wider">
          J-R Beats
        </h1>

        <p className="text-sm text-gray-400">
          Premium Instrumentals
        </p>
      </div>


      <div className="flex items-center gap-8">

        <a
          href="#beats"
          className="text-gray-300 transition hover:text-white"
        >
          Beats
        </a>


        <a
          href="#licenses"
          className="text-gray-300 transition hover:text-white"
        >
          Licences
        </a>


        <CartButton />

      </div>

    </nav>
  );
}