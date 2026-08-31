import {
  Mail,
  MessageCircle,
} from "lucide-react";

function YouTubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.321 5.562a5.124 5.124 0 0 1-3.414-1.267A5.124 5.124 0 0 1 14.316.6h-3.52v14.202a2.958 2.958 0 1 1-2.958-2.958c.31 0 .608.048.889.137V8.39a6.48 6.48 0 0 0-.889-.061 6.473 6.473 0 1 0 6.473 6.473V7.59a8.648 8.648 0 0 0 5.01 1.593V5.562Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.75 2h8.5A5.756 5.756 0 0 1 22 7.75v8.5A5.756 5.756 0 0 1 16.25 22h-8.5A5.756 5.756 0 0 1 2 16.25v-8.5A5.756 5.756 0 0 1 7.75 2Zm0 2A3.754 3.754 0 0 0 4 7.75v8.5A3.754 3.754 0 0 0 7.75 20h8.5A3.754 3.754 0 0 0 20 16.25v-8.5A3.754 3.754 0 0 0 16.25 4h-8.5ZM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-zinc-950 px-8 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-lg font-bold uppercase tracking-[0.4em] text-purple-400">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
            Une question ?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-zinc-400">
            Pour une question sur une licence,
            une commande, une collaboration ou
            un projet musical, contacte J-R Beats
            directement par e-mail.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-white/10 bg-black/40 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400">
            <Mail size={26} />
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-zinc-500">
            E-mail
          </p>

          <p className="mt-2 text-xl font-black text-white">
            j-rbeats@hotmail.com
          </p>

          <a
            href="mailto:j-rbeats@hotmail.com"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-7 py-4 font-black uppercase text-white shadow-[0_0_30px_rgba(168,85,247,0.25)] transition hover:scale-[1.02]"
          >
            <MessageCircle size={19} />
            Envoyer un e-mail
          </a>
        </div>

        <div className="mt-14 text-center">
          <p className="text-lg font-bold uppercase tracking-[0.3em] text-purple-400">
            J-R Beats
          </p>

          <p className="mt-3 text-sm text-zinc-500">
            Retrouve les nouveautés, extraits et
            nouveaux beats sur les réseaux.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://youtube.com/@j-rbeats8538?si=WnbDa4034doS_VVP"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[155px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/40 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-purple-300 transition group-hover:bg-purple-500/20">
                <YouTubeIcon />
              </span>

              YouTube
            </a>

            <a
              href="https://www.tiktok.com/@jrbeats93?_r=1&_t=ZN-990pQNwYBfu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[155px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/40 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-purple-300 transition group-hover:bg-purple-500/20">
                <TikTokIcon />
              </span>

              TikTok
            </a>

            <a
              href="https://www.instagram.com/jrbeats93?igsh=azc0ZXgwdnc0Mnho&igsi=azc0ZXgwdnc0Mnho"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[155px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/40 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-purple-300 transition group-hover:bg-purple-500/20">
                <InstagramIcon />
              </span>

              Instagram
            </a>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-zinc-500">
          © 2026 J-R Beats — jr-beats.fr
        </div>
      </div>
    </section>
  );
}