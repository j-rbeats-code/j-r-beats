import { NextResponse } from "next/server";
import Stripe from "stripe";

import { supabase } from "../../../lib/supabase";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);

type LicenseType =
  | "MP3"
  | "WAV"
  | "PREMIUM"
  | "EXCLUSIVE";

type CartItemRequest = {
  slug: string;
  license: LicenseType;
  licenseAccepted: boolean;
};

type BeatRow = {
  slug: string;
  title: string;
  price_mp3: number;
  price_wav: number;
  price_premium: number;
  price_exclusive: number;
  exclusive_sold: boolean;
};

type PurchasedItem = {
  slug: string;
  title: string;
  license: LicenseType;
  price: number;
  licenseAccepted: boolean;
};

function getLicensePrice(
  beat: BeatRow,
  license: LicenseType
) {
  switch (license) {
    case "MP3":
      return Number(beat.price_mp3);

    case "WAV":
      return Number(beat.price_wav);

    case "PREMIUM":
      return Number(beat.price_premium);

    case "EXCLUSIVE":
      return Number(beat.price_exclusive);

    default:
      throw new Error("Licence invalide.");
  }
}

export async function POST(
  request: Request
) {
  try {
    const body = (await request.json()) as {
      cart?: CartItemRequest[];
      digitalContentAccepted?: boolean;
    };

    const cart = body.cart;

    const digitalContentAccepted =
      body.digitalContentAccepted;

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        {
          error: "Le panier est vide.",
        },
        {
          status: 400,
        }
      );
    }

    if (digitalContentAccepted !== true) {
      return NextResponse.json(
        {
          error:
            "Tu dois confirmer la fourniture immédiate du contenu numérique avant le paiement.",
        },
        {
          status: 400,
        }
      );
    }

    const validLicenses: LicenseType[] = [
      "MP3",
      "WAV",
      "PREMIUM",
      "EXCLUSIVE",
    ];

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      [];

    const purchasedItems: PurchasedItem[] =
      [];

    for (const item of cart) {
      if (
        !item.slug ||
        !validLicenses.includes(item.license)
      ) {
        return NextResponse.json(
          {
            error:
              "Article ou licence invalide.",
          },
          {
            status: 400,
          }
        );
      }

      if (item.licenseAccepted !== true) {
        return NextResponse.json(
          {
            error:
              `La licence ${item.license} doit être acceptée avant le paiement.`,
          },
          {
            status: 400,
          }
        );
      }

      const { data, error } =
        await supabase
          .from("beats")
          .select(`
            slug,
            title,
            price_mp3,
            price_wav,
            price_premium,
            price_exclusive,
            exclusive_sold
          `)
          .eq("slug", item.slug)
          .single();

      if (error || !data) {
        console.error(
          "Erreur Supabase checkout :",
          error
        );

        return NextResponse.json(
          {
            error:
              "Impossible de trouver un beat du panier.",
          },
          {
            status: 400,
          }
        );
      }

      const beat = data as BeatRow;

      /*
       * BLOQUER TOUTE NOUVELLE VENTE
       * SI LE BEAT A DÉJÀ ÉTÉ VENDU
       * EN EXCLUSIVE
       */

      if (beat.exclusive_sold === true) {
        return NextResponse.json(
          {
            error:
              `${beat.title} a déjà été vendu en licence EXCLUSIVE et n'est plus disponible à la vente.`,
          },
          {
            status: 409,
          }
        );
      }

      const price = getLicensePrice(
        beat,
        item.license
      );

      if (
        !Number.isFinite(price) ||
        price <= 0
      ) {
        return NextResponse.json(
          {
            error:
              "Prix invalide pour cette licence.",
          },
          {
            status: 400,
          }
        );
      }

      lineItems.push({
        quantity: 1,

        price_data: {
          currency: "eur",

          unit_amount: Math.round(
            price * 100
          ),

          product_data: {
            name: `${beat.title} - ${item.license}`,
          },
        },
      });

      purchasedItems.push({
        slug: beat.slug,
        title: beat.title,
        license: item.license,
        price,
        licenseAccepted: true,
      });
    }

    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        payment_method_types: ["card"],

        line_items: lineItems,

        success_url:
          "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",

        cancel_url:
          "http://localhost:3000/",

        metadata: {
          items: JSON.stringify(
            purchasedItems
          ),

          digital_content_accepted:
            "true",

          license_accepted:
            "true",

          license_name:
            purchasedItems
              .map((item) => item.license)
              .join(","),
        },
      });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(
      "Erreur Stripe Checkout :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Impossible de créer la session de paiement.",
      },
      {
        status: 500,
      }
    );
  }
}