import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { generateInvoicePdf } from "../../../../lib/invoice";

export const runtime = "nodejs";

type PurchasedItem = {
  slug: string;
  title: string;
  license: string;
  price: number;
};

type RequestBody = {
  orderId?: number;
};

function getCountryName(
  countryCode: string | null
) {
  if (!countryCode) {
    return null;
  }

  if (countryCode.toUpperCase() === "FR") {
    return "France";
  }

  return countryCode;
}

export async function POST(
  request: Request
) {
  try {
    /*
     * 1. RÉCUPÉRER LE TOKEN DU CLIENT CONNECTÉ
     */

    const authorization =
      request.headers.get("authorization");

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return NextResponse.json(
        {
          error:
            "Utilisateur non authentifié.",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken =
      authorization.replace(
        "Bearer ",
        ""
      );

    /*
     * 2. VÉRIFIER LE COMPTE SUPABASE
     */

    const {
      data: userData,
      error: userError,
    } = await supabaseAdmin.auth.getUser(
      accessToken
    );

    const user = userData.user;

    if (
      userError ||
      !user ||
      !user.email
    ) {
      return NextResponse.json(
        {
          error:
            "Session utilisateur invalide.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * 3. LIRE L'IDENTIFIANT DE LA COMMANDE
     */

    const body =
      (await request.json()) as RequestBody;

    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        {
          error:
            "Identifiant de commande manquant.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 4. RETROUVER LA COMMANDE
     *
     * IMPORTANT :
     * On vérifie que l'adresse e-mail
     * de la commande correspond bien
     * au compte actuellement connecté.
     */

    const {
      data: order,
      error: orderError,
    } = await supabaseAdmin
      .from("orders")
      .select(
        `
          id,
          customer_email,
          customer_name,
          billing_address_line1,
          billing_address_line2,
          billing_postal_code,
          billing_city,
          billing_state,
          billing_country,
          amount_total,
          currency,
          payment_status,
          items,
          invoice_number,
          invoice_date
        `
      )
      .eq(
        "id",
        orderId
      )
      .eq(
        "customer_email",
        user.email
      )
      .single();

    if (
      orderError ||
      !order
    ) {
      return NextResponse.json(
        {
          error:
            "Commande introuvable.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * 5. VÉRIFIER QUE LA COMMANDE EST PAYÉE
     */

    if (
      order.payment_status !== "paid"
    ) {
      return NextResponse.json(
        {
          error:
            "Cette commande n'est pas confirmée comme payée.",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * 6. VÉRIFIER QUE LA FACTURE EXISTE
     */

    if (
      !order.invoice_number ||
      !order.invoice_date
    ) {
      return NextResponse.json(
        {
          error:
            "Aucune facture n'est disponible pour cette commande.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * 7. PRÉPARER LES ARTICLES DE LA FACTURE
     */

    const purchasedItems =
      Array.isArray(order.items)
        ? (order.items as PurchasedItem[])
        : [];

    if (purchasedItems.length === 0) {
      return NextResponse.json(
        {
          error:
            "Aucun article trouvé dans cette commande.",
        },
        {
          status: 400,
        }
      );
    }

    const invoiceItems =
      purchasedItems.map(
        (item) => ({
          beatTitle: item.title,
          license: item.license,
          price: Number(item.price),
        })
      );

    /*
     * 8. GÉNÉRER LE PDF
     */

    const pdfBytes =
      await generateInvoicePdf({
        invoiceNumber:
          order.invoice_number,

        invoiceDate:
          new Date(
            order.invoice_date
          ),

        customer: {
          name:
            order.customer_name,

          email:
            order.customer_email,

          addressLine1:
            order.billing_address_line1,

          addressLine2:
            order.billing_address_line2,

          postalCode:
            order.billing_postal_code,

          city:
            order.billing_city,

          state:
            order.billing_state,

          country:
            getCountryName(
              order.billing_country
            ),
        },

        items:
          invoiceItems,

        total:
          Number(
            order.amount_total ?? 0
          ),

        currency:
          order.currency ??
          "eur",
      });

    /*
     * 9. RENVOYER LE PDF AU CLIENT
     */

    const pdfArrayBuffer =
      Uint8Array.from(
        pdfBytes
      ).buffer;

    return new Response(
      pdfArrayBuffer,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${order.invoice_number}.pdf"`,

          "Cache-Control":
            "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Erreur génération facture PDF :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Impossible de générer la facture.",
      },
      {
        status: 500,
      }
    );
  }
}