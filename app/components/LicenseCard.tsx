type LicenseCardProps = {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
};

export default function LicenseCard({
  name,
  price,
  description,
  popular,
}: LicenseCardProps) {
  return (
    <div
      className={`relative rounded-3xl border p-8 transition hover:-translate-y-2 ${
        popular
          ? "border-purple-500 bg-purple-950/30"
          : "border-white/10 bg-zinc-900"
      }`}
    >

      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-5 py-1 text-sm font-bold">
          POPULAIRE
        </span>
      )}


      <h3 className="text-2xl font-black">
        {name}
      </h3>


      <p className="mt-4 text-4xl font-black text-purple-400">
        {price}
      </p>


      <p className="mt-5 text-gray-400">
        {description}
      </p>


      <button className="mt-8 w-full rounded-full bg-white py-3 font-bold text-black transition hover:bg-purple-500 hover:text-white">
        Choisir cette licence
      </button>

    </div>
  );
}