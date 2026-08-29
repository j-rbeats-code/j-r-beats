"use client";

import {
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

type AudioPlayerProps = {
  src: string;
  title: string;
  artist?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export default function AudioPlayer({
  src,
  title,
  artist = "J-R Beats",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    function stopOtherPlayers(event: Event) {
      const customEvent = event as CustomEvent<string>;

      if (customEvent.detail !== src) {
        const audio = audioRef.current;

        if (audio) {
          audio.pause();
          setPlaying(false);
        }
      }
    }

    window.addEventListener(
      "jr-beats-audio-play",
      stopOtherPlayers,
    );

    return () => {
      window.removeEventListener(
        "jr-beats-audio-play",
        stopOtherPlayers,
      );
    };
  }, [src]);

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      window.dispatchEvent(
        new CustomEvent("jr-beats-audio-play", {
          detail: src,
        }),
      );

      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.error(
          "Impossible de lire le fichier audio :",
          error,
        );
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function handleProgressChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const audio = audioRef.current;
    const newTime = Number(event.target.value);

    if (!audio) {
      return;
    }

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleVolumeChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const newVolume = Number(event.target.value);
    const audio = audioRef.current;

    setVolume(newVolume);
    setMuted(newVolume === 0);

    if (audio) {
      audio.volume = newVolume;
      audio.muted = newVolume === 0;
    }
  }

  function toggleMute() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextMuted = !muted;

    audio.muted = nextMuted;
    setMuted(nextMuted);
  }

  const progress =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={
            playing
              ? `Mettre ${title} en pause`
              : `Lire ${title}`
          }
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-800 text-white shadow-[0_0_30px_rgba(168,85,247,0.55)] transition hover:scale-105"
        >
          {playing ? (
            <Pause size={23} fill="currentColor" />
          ) : (
            <Play
              size={23}
              fill="currentColor"
              className="ml-1"
            />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-white">
            {title}
          </p>

          <p className="text-xs text-zinc-400">
            {artist}
          </p>

          <div className="mt-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.01"
              value={currentTime}
              onChange={handleProgressChange}
              aria-label={`Progression de ${title}`}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-purple-500"
              style={{
                background: `linear-gradient(to right, rgb(168 85 247) ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
              }}
            />

            <div className="mt-2 flex justify-between text-[11px] text-zinc-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={
              muted ? "Réactiver le son" : "Couper le son"
            }
            className="text-zinc-400 transition hover:text-purple-400"
          >
            {muted || volume === 0 ? (
              <VolumeX size={19} />
            ) : (
              <Volume2 size={19} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="h-1 w-20 cursor-pointer accent-purple-500"
          />
        </div>
      </div>
    </div>
  );
}