"use client";

import AudioPlayer from "./AudioPlayer";
import { useCart } from "../context/CartContext";


type BeatCardProps = {
  title: string;
  price: string;
  image: string;
  bpm: string;
  keyName: string;
  duration: string;
};


export default function BeatCard({
  title,
  price,
  image,
  bpm,
  keyName,
  duration,
}: BeatCardProps) {


  const { addToCart } = useCart();


  function handleAddToCart() {

    addToCart({
      title,
      price: Number(
        price.replace(",", ".").replace(" €", "")
      ),
    });

  }


  return (
    <div className="group rounded-3xl border border-white/10 bg-zinc-900 p-6 transition hover:-translate-y-2">


      <div className="overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>


      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>


      <div className="mt-3 flex gap-3 text-sm text-gray-400">

        <span className="rounded-full bg-white/10 px-3 py-1">
          {bpm}
        </span>

        <span className="rounded-full bg-white/10 px-3 py-1">
          {keyName}
        </span>

        <span className="rounded-full bg-white/10 px-3 py-1">
          {duration}
        </span>

      </div>


      <AudioPlayer />


      <div className="mt-6 flex items-center justify-between">

        <span className="font-bold text-purple-400">
          {price}
        </span>


        <button
          onClick={handleAddToCart}
          className="rounded-full bg-white px-5 py-2 font-bold text-black transition hover:bg-purple-500 hover:text-white"
        >
          Acheter
        </button>


      </div>


    </div>
  );
}