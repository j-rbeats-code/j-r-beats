import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function GET() {
  try {
    const { data, error } =
      await resend.emails.send({
        from: "J-R Beats <noreply@jr-beats.fr>",
        to: ["j-rbeats@hotmail.com"],
        subject: "Test e-mail J-R Beats 🎵",

        html: `
          <div
            style="
              background:#09090b;
              color:#ffffff;
              font-family:Arial,sans-serif;
              padding:40px;
            "
          >
            <div
              style="
                max-width:600px;
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
                  font-size:32px;
                  margin-top:15px;
                "
              >
                Test e-mail réussi 🎵
              </h1>

              <p
                style="
                  color:#a1a1aa;
                  line-height:1.7;
                "
              >
                Ceci est un e-mail de test envoyé
                automatiquement depuis ton site
                J-R Beats avec Resend.
              </p>

              <p
                style="
                  color:#d8b4fe;
                  font-weight:bold;
                  margin-top:25px;
                "
              >
                Si tu reçois cet e-mail,
                la connexion J-R Beats → Resend
                fonctionne correctement.
              </p>
            </div>
          </div>
        `,
      });

    if (error) {
      console.error(
        "Erreur Resend :",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "E-mail de test envoyé.",
      data,
    });
  } catch (error) {
    console.error(
      "Erreur test e-mail :",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur inconnue",
      },
      {
        status: 500,
      }
    );
  }
}