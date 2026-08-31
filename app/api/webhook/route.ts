import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { createR2SignedUrl } from "../../../lib/r2";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

const resend = new Resend(
  process.env.RESEND_API_KEY
);

type PurchasedItem = {
  slug: string;
  title: string;
  license: string;
  price: number;
  licenseAccepted?: boolean;
};

type DownloadLink = {
  label: string;
  url: string;
};

export async function POST(
  request: Request
) {
  const body = await request.text();

  const signature =
    request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        error: "Signature Stripe absente.",
      },
      {
        status: 400,
      }
    );
  }

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
  } catch (error) {
    console.error(
      "Signature webhook invalide :",
      error
    );

    return NextResponse.json(
      {
        error: "Webhook invalide.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data
          .object as Stripe.Checkout.Session;

      if (
        session.payment_status !== "paid"
      ) {
        return NextResponse.json({
          received: true,
        });
      }

      let items: PurchasedItem[] = [];

      if (session.metadata?.items) {
        try {
          items = JSON.parse(
            session.metadata.items
          );
        } catch (error) {
          console.error(
            "Erreur lecture metadata items :",
            error
          );
        }
      }

      const digitalContentAccepted =
        session.metadata
          ?.digital_content_accepted ===
        "true";

      const licenseAccepted =
        session.metadata
          ?.license_accepted ===
        "true";

      const licenseName =
        session.metadata
          ?.license_name ??
        null;

      const customerEmail =
        session.customer_details?.email ??
        null;

      const customerName =
        session.customer_details?.name ??
        null;

      const billingAddress =
        session.customer_details?.address;

      const billingAddressLine1 =
        billingAddress?.line1 ?? null;

      const billingAddressLine2 =
        billingAddress?.line2 ?? null;

      const billingPostalCode =
        billingAddress?.postal_code ?? null;

      const billingCity =
        billingAddress?.city ?? null;

      const billingState =
        billingAddress?.state ?? null;

      const billingCountry =
        billingAddress?.country ?? null;

      const amountTotal =
        (session.amount_total ?? 0) / 100;

      /*
       * ENREGISTREMENT DE LA COMMANDE
       */

      const { error: orderError } =
        await supabaseAdmin
          .from("orders")
          .upsert(
            {
              stripe_session_id:
                session.id,

              customer_email:
                customerEmail,

              customer_name:
                customerName,

              billing_address_line1:
                billingAddressLine1,

              billing_address_line2:
                billingAddressLine2,

              billing_postal_code:
                billingPostalCode,

              billing_city:
                billingCity,

              billing_state:
                billingState,

              billing_country:
                billingCountry,

              amount_total:
                amountTotal,

              currency:
                session.currency ??
                "eur",

              payment_status:
                session.payment_status,

              items,

              digital_content_accepted:
                digitalContentAccepted,

              license_accepted:
                licenseAccepted,

              license_name:
                licenseName,
            },
            {
              onConflict:
                "stripe_session_id",
            }
          );

      if (orderError) {
        console.error(
          "Erreur Supabase webhook :",
          JSON.stringify(
            orderError,
            null,
            2
          )
        );

        return NextResponse.json(
          {
            error:
              "Erreur enregistrement commande.",
          },
          {
            status: 500,
          }
        );
      }

      console.log(
        "✅ Commande enregistrée :",
        session.id
      );

      /*
       * SI UNE LICENCE EXCLUSIVE A ÉTÉ PAYÉE,
       * ON MARQUE LE BEAT COMME VENDU.
       */

      for (const item of items) {
        if (
          item.license === "EXCLUSIVE"
        ) {
          const {
            error: exclusiveError,
          } = await supabaseAdmin
            .from("beats")
            .update({
              exclusive_sold: true,

              exclusive_sold_at:
                new Date().toISOString(),

              exclusive_stripe_session_id:
                session.id,
            })
            .eq(
              "slug",
              item.slug
            );

          if (exclusiveError) {
            console.error(
              `Erreur marquage EXCLUSIVE ${item.slug} :`,
              exclusiveError
            );

            return NextResponse.json(
              {
                error:
                  "Erreur lors du retrait du beat vendu en EXCLUSIVE.",
              },
              {
                status: 500,
              }
            );
          }

          console.log(
            `✅ Beat vendu en EXCLUSIVE : ${item.slug}`
          );
        }
      }

      /*
       * LIENS DE TÉLÉCHARGEMENT
       */

      const downloadLinks: DownloadLink[] =
        [];

      for (const item of items) {
        /*
         * MP3
         * Inclus dans toutes les licences.
         */

        const mp3TaggedPath =
          `${item.slug}/mp3/${item.slug}-tagged.mp3`;

        const mp3UntaggedPath =
          `${item.slug}/mp3/${item.slug}-untagged.mp3`;

        const {
          data: mp3TaggedData,
          error: mp3TaggedError,
        } = await supabaseAdmin.storage
          .from("beats-files")
          .createSignedUrl(
            mp3TaggedPath,
            60 * 60 * 24,
            {
              download: true,
            }
          );

        if (mp3TaggedError) {
          console.error(
            `Erreur MP3 tagged ${item.slug} :`,
            mp3TaggedError
          );
        }

        const {
          data: mp3UntaggedData,
          error: mp3UntaggedError,
        } = await supabaseAdmin.storage
          .from("beats-files")
          .createSignedUrl(
            mp3UntaggedPath,
            60 * 60 * 24,
            {
              download: true,
            }
          );

        if (mp3UntaggedError) {
          console.error(
            `Erreur MP3 untagged ${item.slug} :`,
            mp3UntaggedError
          );
        }

        if (mp3TaggedData?.signedUrl) {
          downloadLinks.push({
            label:
              `${item.title} - MP3 avec tag J-R Beats`,
            url:
              mp3TaggedData.signedUrl,
          });
        }

        if (mp3UntaggedData?.signedUrl) {
          downloadLinks.push({
            label:
              `${item.title} - MP3 sans tag`,
            url:
              mp3UntaggedData.signedUrl,
          });
        }

        /*
         * WAV
         * Inclus dans WAV, PREMIUM et EXCLUSIVE.
         */

        if (
          item.license === "WAV" ||
          item.license === "PREMIUM" ||
          item.license === "EXCLUSIVE"
        ) {
          const wavTaggedKey =
            `${item.slug}/wav/${item.slug}-tagged.wav`;

          const wavUntaggedKey =
            `${item.slug}/wav/${item.slug}-untagged.wav`;

          try {
            const wavTaggedUrl =
              await createR2SignedUrl(
                wavTaggedKey
              );

            downloadLinks.push({
              label:
                `${item.title} - WAV 24-bit avec tag J-R Beats`,
              url: wavTaggedUrl,
            });
          } catch (error) {
            console.error(
              `Erreur R2 WAV tagged ${item.slug} :`,
              error
            );
          }

          try {
            const wavUntaggedUrl =
              await createR2SignedUrl(
                wavUntaggedKey
              );

            downloadLinks.push({
              label:
                `${item.title} - WAV 24-bit sans tag`,
              url: wavUntaggedUrl,
            });
          } catch (error) {
            console.error(
              `Erreur R2 WAV untagged ${item.slug} :`,
              error
            );
          }
        }

        /*
         * STEMS
         * Inclus dans PREMIUM et EXCLUSIVE.
         */

        if (
          item.license === "PREMIUM" ||
          item.license === "EXCLUSIVE"
        ) {
          const stemsKey =
            `${item.slug}/stems/${item.slug}-stems.zip`;

          try {
            const stemsUrl =
              await createR2SignedUrl(
                stemsKey
              );

            downloadLinks.push({
              label:
                `${item.title} - STEMS / pistes séparées`,
              url: stemsUrl,
            });
          } catch (error) {
            console.error(
              `Erreur R2 STEMS ${item.slug} :`,
              error
            );
          }
        }
      }

      /*
       * E-MAIL CLIENT
       */

      if (customerEmail) {
        const itemsHtml = items
          .map(
            (item) => `
              <div
                style="
                  margin-top:16px;
                  padding:16px;
                  border:1px solid #27272a;
                  border-radius:12px;
                  background:#09090b;
                "
              >
                <div
                  style="
                    color:#ffffff;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  ${item.title}
                </div>

                <div
                  style="
                    margin-top:6px;
                    color:#a1a1aa;
                    font-size:14px;
                  "
                >
                  Licence ${item.license}
                </div>

                <div
                  style="
                    margin-top:6px;
                    color:#c084fc;
                    font-size:16px;
                    font-weight:bold;
                  "
                >
                  ${Number(item.price)
                    .toFixed(2)
                    .replace(".", ",")} €
                </div>
              </div>
            `
          )
          .join("");

        const downloadsHtml =
          downloadLinks.length > 0
            ? `
              <div
                style="
                  margin-top:30px;
                "
              >
                <div
                  style="
                    color:#d8b4fe;
                    font-size:13px;
                    font-weight:bold;
                    letter-spacing:2px;
                    text-transform:uppercase;
                  "
                >
                  Tes téléchargements
                </div>

                ${downloadLinks
                  .map(
                    (file) => `
                      <a
                        href="${file.url}"
                        style="
                          display:block;
                          margin-top:12px;
                          padding:16px;
                          border-radius:12px;
                          background:#7e22ce;
                          color:#ffffff;
                          text-decoration:none;
                          text-align:center;
                          font-size:14px;
                          font-weight:bold;
                        "
                      >
                        ⬇ ${file.label}
                      </a>
                    `
                  )
                  .join("")}

                <p
                  style="
                    margin-top:14px;
                    color:#71717a;
                    font-size:12px;
                    line-height:1.6;
                  "
                >
                  Ces liens sont privés et
                  expirent automatiquement
                  après 24 heures.
                </p>
              </div>
            `
            : `
              <p
                style="
                  margin-top:28px;
                  color:#a1a1aa;
                  line-height:1.7;
                  font-size:14px;
                "
              >
                Aucun téléchargement automatique
                n'est disponible pour cette commande.
              </p>
            `;

        const {
          data: emailData,
          error: emailError,
        } = await resend.emails.send({
          from:
            "J-R Beats <onboarding@resend.dev>",

          to: [customerEmail],

          subject:
            "Confirmation de ta commande J-R Beats 🎵",

          html: `
            <div
              style="
                background:#09090b;
                color:#ffffff;
                font-family:Arial,sans-serif;
                padding:40px 20px;
              "
            >
              <div
                style="
                  max-width:620px;
                  margin:auto;
                  background:#18181b;
                  border-radius:20px;
                  padding:32px;
                "
              >
                <p
                  style="
                    color:#a855f7;
                    font-size:14px;
                    font-weight:bold;
                    letter-spacing:3px;
                    text-transform:uppercase;
                  "
                >
                  J-R Beats
                </p>

                <h1
                  style="
                    margin-top:16px;
                    font-size:30px;
                    color:#ffffff;
                  "
                >
                  Paiement confirmé
                </h1>

                <p
                  style="
                    color:#a1a1aa;
                    line-height:1.7;
                  "
                >
                  Merci pour ta commande.
                  Ton paiement a bien été confirmé.
                </p>

                <div
                  style="
                    margin-top:24px;
                    padding:20px;
                    border-radius:14px;
                    background:#09090b;
                    border:1px solid #27272a;
                    text-align:center;
                  "
                >
                  <div
                    style="
                      color:#71717a;
                      font-size:13px;
                    "
                  >
                    Montant payé
                  </div>

                  <div
                    style="
                      margin-top:8px;
                      color:#c084fc;
                      font-size:30px;
                      font-weight:bold;
                    "
                  >
                    ${amountTotal
                      .toFixed(2)
                      .replace(".", ",")} €
                  </div>
                </div>

                <div
                  style="
                    margin-top:28px;
                  "
                >
                  <div
                    style="
                      color:#d8b4fe;
                      font-size:13px;
                      font-weight:bold;
                      letter-spacing:2px;
                      text-transform:uppercase;
                    "
                  >
                    Ta commande
                  </div>

                  ${itemsHtml}
                </div>

                ${downloadsHtml}

                <p
                  style="
                    margin-top:28px;
                    color:#71717a;
                    font-size:12px;
                  "
                >
                  Référence Stripe :
                  ${session.id}
                </p>
              </div>
            </div>
          `,
        });

        if (emailError) {
          console.error(
            "Erreur envoi e-mail Resend :",
            JSON.stringify(
              emailError,
              null,
              2
            )
          );
        } else {
          console.log(
            "✅ E-mail de confirmation envoyé :",
            emailData?.id
          );
        }
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Erreur traitement webhook :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erreur serveur webhook.",
      },
      {
        status: 500,
      }
    );
  }
}