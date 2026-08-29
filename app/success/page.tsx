import Link from "next/link";
import Stripe from "stripe";

import { supabaseAdmin } from "../../lib/supabaseAdmin";

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

type PurchasedItem = {
  slug: string;
  title: string;
  license: string;
  price: number;
};

type DownloadLink = {
  label: string;
  url: string;
};

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black">
            Session introuvable
          </h1>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-purple-600 px-6 py-3 font-bold"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  }

  const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY!
  );

  try {
    const session =
      await stripe.checkout.sessions.retrieve(
        session_id
      );

    const paid =
      session.payment_status === "paid";

    let purchasedItems: PurchasedItem[] = [];

    if (session.metadata?.items) {
      try {
        purchasedItems = JSON.parse(
          session.metadata.items
        );
      } catch (error) {
        console.error(
          "Impossible de lire les articles Stripe :",
          error
        );
      }
    }

    const downloadLinks: DownloadLink[] = [];

    if (paid) {
      for (const item of purchasedItems) {
        if (item.license === "MP3") {
          const taggedPath =
            `${item.slug}/mp3/${item.slug}-tagged.mp3`;

          const untaggedPath =
            `${item.slug}/mp3/${item.slug}-untagged.mp3`;

          const { data: taggedData } =
            await supabaseAdmin.storage
              .from("beats-files")
              .createSignedUrl(
                taggedPath,
                60 * 10
              );

          const { data: untaggedData } =
            await supabaseAdmin.storage
              .from("beats-files")
              .createSignedUrl(
                untaggedPath,
                60 * 10
              );

          if (taggedData?.signedUrl) {
            downloadLinks.push({
              label:
                `${item.title} - MP3 avec tag J-R Beats`,
              url: taggedData.signedUrl,
            });
          }

          if (untaggedData?.signedUrl) {
            downloadLinks.push({
              label:
                `${item.title} - MP3 sans tag`,
              url: untaggedData.signedUrl,
            });
          }
        }
      }
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center">
          {paid ? (
            <>
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl text-green-400">
                ✓
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-purple-400">
                J-R Beats
              </p>

              <h1 className="mt-4 text-4xl font-black uppercase">
                Paiement confirmé
              </h1>

              <p className="mt-5 text-zinc-400">
                Ton paiement Stripe a bien été
                confirmé.
              </p>

              {session.customer_details?.email && (
                <p className="mt-3 text-sm text-zinc-500">
                  E-mail :{" "}
                  {session.customer_details.email}
                </p>
              )}

              <div className="mt-8 rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-zinc-500">
                  Montant payé
                </p>

                <p className="mt-2 text-3xl font-black text-purple-400">
                  {session.amount_total
                    ? (
                        session.amount_total /
                        100
                      )
                        .toFixed(2)
                        .replace(".", ",")
                    : "0,00"}{" "}
                  €
                </p>
              </div>

              {purchasedItems.length > 0 && (
                <div className="mt-6 text-left">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                    Ta commande
                  </p>

                  <div className="mt-3 space-y-3">
                    {purchasedItems.map(
                      (item, index) => (
                        <div
                          key={`${item.slug}-${item.license}-${index}`}
                          className="rounded-xl border border-white/10 bg-black/40 p-4"
                        >
                          <p className="font-bold text-white">
                            {item.title}
                          </p>

                          <p className="mt-1 text-sm text-zinc-400">
                            Licence {item.license}
                          </p>

                          <p className="mt-1 font-black text-purple-400">
                            {Number(item.price)
                              .toFixed(2)
                              .replace(".", ",")}{" "}
                            €
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {downloadLinks.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
                    Tes téléchargements
                  </p>

                  <div className="mt-4 space-y-3">
                    {downloadLinks.map(
                      (file, index) => (
                        <a
                          key={`${file.url}-${index}`}
                          href={file.url}
                          className="block rounded-xl border border-purple-500/30 bg-purple-600/10 px-5 py-4 font-bold text-purple-300 transition hover:bg-purple-600/20"
                        >
                          ⬇ {file.label}
                        </a>
                      )
                    )}
                  </div>

                  <p className="mt-3 text-xs text-zinc-500">
                    Ces liens sont temporaires et
                    expirent après 10 minutes.
                  </p>
                </div>
              )}

              <p className="mt-6 text-sm text-zinc-500">
                Ta commande a été enregistrée
                automatiquement après confirmation
                du paiement.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-black">
                Paiement non confirmé
              </h1>

              <p className="mt-4 text-zinc-400">
                Stripe n&apos;indique pas encore
                cette session comme payée.
              </p>
            </>
          )}

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-7 py-3 font-black uppercase"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    console.error(
      "Erreur Stripe sur la page success :",
      error
    );

    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black">
            Erreur de vérification
          </h1>

          <p className="mt-4 text-zinc-400">
            Impossible de vérifier la session
            Stripe.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-purple-600 px-6 py-3 font-bold"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  }
}