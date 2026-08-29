import { NextResponse } from "next/server";

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { createR2SignedUrl } from "../../../../lib/r2";

type PurchasedItem = {
  slug: string;
  title: string;
  license: string;
  price: number;
};

type DownloadType =
  | "mp3-tagged"
  | "mp3-untagged"
  | "wav-tagged"
  | "wav-untagged"
  | "stems";

type RequestBody = {
  orderId?: number;
  slug?: string;
  type?: DownloadType;
};

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
     * 3. LIRE LA DEMANDE
     */

    const body =
      (await request.json()) as RequestBody;

    const {
      orderId,
      slug,
      type,
    } = body;

    if (
      !orderId ||
      !slug ||
      !type
    ) {
      return NextResponse.json(
        {
          error:
            "Informations de téléchargement incomplètes.",
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
     * au compte connecté.
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
          payment_status,
          items
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
     * 6. RETROUVER LE BEAT DANS LA COMMANDE
     */

    const items =
      Array.isArray(order.items)
        ? (order.items as PurchasedItem[])
        : [];

    const purchasedItem =
      items.find(
        (item) =>
          item.slug === slug
      );

    if (!purchasedItem) {
      return NextResponse.json(
        {
          error:
            "Ce beat n'appartient pas à cette commande.",
        },
        {
          status: 403,
        }
      );
    }

    const license =
      purchasedItem.license;

    /*
     * 7. VÉRIFIER LES DROITS SELON LA LICENCE
     */

    const canDownloadMp3 =
      [
        "MP3",
        "WAV",
        "PREMIUM",
        "EXCLUSIVE",
      ].includes(license);

    const canDownloadWav =
      [
        "WAV",
        "PREMIUM",
        "EXCLUSIVE",
      ].includes(license);

    const canDownloadStems =
      [
        "PREMIUM",
        "EXCLUSIVE",
      ].includes(license);

    /*
     * 8. MP3 AVEC TAG
     */

    if (
      type === "mp3-tagged"
    ) {
      if (!canDownloadMp3) {
        return NextResponse.json(
          {
            error:
              "Cette licence ne permet pas ce téléchargement.",
          },
          {
            status: 403,
          }
        );
      }

      const filePath =
        `${slug}/mp3/${slug}-tagged.mp3`;

      const {
        data,
        error,
      } = await supabaseAdmin.storage
        .from("beats-files")
        .createSignedUrl(
          filePath,
          60 * 10,
          {
            download: true,
          }
        );

      if (
        error ||
        !data?.signedUrl
      ) {
        console.error(
          "Erreur lien MP3 tagged :",
          error
        );

        return NextResponse.json(
          {
            error:
              "Impossible de générer le téléchargement MP3.",
          },
          {
            status: 500,
          }
        );
      }

      return NextResponse.json({
        url: data.signedUrl,
      });
    }

    /*
     * 9. MP3 SANS TAG
     */

    if (
      type === "mp3-untagged"
    ) {
      if (!canDownloadMp3) {
        return NextResponse.json(
          {
            error:
              "Cette licence ne permet pas ce téléchargement.",
          },
          {
            status: 403,
          }
        );
      }

      const filePath =
        `${slug}/mp3/${slug}-untagged.mp3`;

      const {
        data,
        error,
      } = await supabaseAdmin.storage
        .from("beats-files")
        .createSignedUrl(
          filePath,
          60 * 10,
          {
            download: true,
          }
        );

      if (
        error ||
        !data?.signedUrl
      ) {
        console.error(
          "Erreur lien MP3 untagged :",
          error
        );

        return NextResponse.json(
          {
            error:
              "Impossible de générer le téléchargement MP3.",
          },
          {
            status: 500,
          }
        );
      }

      return NextResponse.json({
        url: data.signedUrl,
      });
    }

    /*
     * 10. WAV AVEC TAG
     */

    if (
      type === "wav-tagged"
    ) {
      if (!canDownloadWav) {
        return NextResponse.json(
          {
            error:
              "La licence MP3 n'inclut pas les fichiers WAV.",
          },
          {
            status: 403,
          }
        );
      }

      const fileKey =
        `${slug}/wav/${slug}-tagged.wav`;

      try {
        const url =
          await createR2SignedUrl(
            fileKey
          );

        return NextResponse.json({
          url,
        });
      } catch (error) {
        console.error(
          "Erreur R2 WAV tagged :",
          error
        );

        return NextResponse.json(
          {
            error:
              "Impossible de générer le téléchargement WAV.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * 11. WAV SANS TAG
     */

    if (
      type === "wav-untagged"
    ) {
      if (!canDownloadWav) {
        return NextResponse.json(
          {
            error:
              "La licence MP3 n'inclut pas les fichiers WAV.",
          },
          {
            status: 403,
          }
        );
      }

      const fileKey =
        `${slug}/wav/${slug}-untagged.wav`;

      try {
        const url =
          await createR2SignedUrl(
            fileKey
          );

        return NextResponse.json({
          url,
        });
      } catch (error) {
        console.error(
          "Erreur R2 WAV untagged :",
          error
        );

        return NextResponse.json(
          {
            error:
              "Impossible de générer le téléchargement WAV.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * 12. STEMS
     */

    if (
      type === "stems"
    ) {
      if (!canDownloadStems) {
        return NextResponse.json(
          {
            error:
              "Cette licence n'inclut pas les STEMS.",
          },
          {
            status: 403,
          }
        );
      }

      const fileKey =
        `${slug}/stems/${slug}-stems.zip`;

      try {
        const url =
          await createR2SignedUrl(
            fileKey
          );

        return NextResponse.json({
          url,
        });
      } catch (error) {
        console.error(
          "Erreur R2 STEMS :",
          error
        );

        return NextResponse.json(
          {
            error:
              "Impossible de générer le téléchargement STEMS.",
          },
          {
            status: 500,
          }
        );
      }
    }

    /*
     * 13. TYPE INCONNU
     */

    return NextResponse.json(
      {
        error:
          "Type de téléchargement inconnu.",
      },
      {
        status: 400,
      }
    );
  } catch (error) {
    console.error(
      "Erreur route compte téléchargement :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Erreur serveur.",
      },
      {
        status: 500,
      }
    );
  }
}