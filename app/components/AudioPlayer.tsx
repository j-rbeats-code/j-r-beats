"use client";

import { Play, Pause } from "lucide-react";
import { useState } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">

      <div className="flex items-center gap-4">

        <button
          onClick={() => setPlaying(!playing)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 transition hover:bg-purple-700"
        >
          {playing ? (
            <Pause size={22} />
          ) : (
            <Play size={22} />
          )}
        </button>


        <div className="flex-1">

          <p className="font-bold">
            Dark City
          </p>

          <p className="text-sm text-gray-400">
            J-R Beats • 140 BPM
          </p>


          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/20">

            <div className="h-full w-1/3 rounded-full bg-purple-500" />

          </div>

        </div>

      </div>

    </div>
  );
}