import {
  Mail,
  MessageCircle,
  Music2,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-zinc-950 px-8 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
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
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
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
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-black text-purple-300 transition group-hover:bg-purple-500/20">
                YT
              </span>

              YouTube
            </a>

            <a
              href="https://www.tiktok.com/@jrbeats93?_r=1&_t=ZN-990pQNwYBfu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[155px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/40 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-black text-purple-300 transition group-hover:bg-purple-500/20">
                TT
              </span>

              TikTok
            </a>

            <a
              href="https://www.instagram.com/jrbeats93?igsh=azc0ZXgwdnc0Mnho&igsi=azc0ZXgwdnc0Mnho"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-w-[155px] items-center justify-center gap-3 rounded-xl border border-white/10 bg-black/40 px-6 py-4 font-bold text-white transition hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-black text-purple-300 transition group-hover:bg-purple-500/20">
                IG
              </span>

              Instagram
            </a>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-zinc-500">
          <Music2
            size={18}
            className="text-purple-400"
          />

          <span>
            J-R Beats
          </span>
        </div>
      </div>
    </section>
  );
}