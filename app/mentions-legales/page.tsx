export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-10 text-4xl font-black uppercase">
          Mentions <span className="text-purple-500">légales</span>
        </h1>

        <div className="space-y-10 text-zinc-300">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              1. Éditeur du site
            </h2>

            <p className="leading-7">
              Le site J-R Beats est édité par :
              <br />
              <strong className="text-white">
                Jérôme RANTIER — Entrepreneur individuel
              </strong>
              <br />
              Nom commercial : J-R Beats
              <br />
              9 Avenue Girardin
              <br />
              95880 Enghien-les-Bains — France
              <br />
              SIREN : 108 822 958
              <br />
              SIRET : 108 822 958 00014
              <br />
              Code APE : 90.03B — Autre création artistique
              <br />
              Téléphone : 06 01 32 18 91
              <br />
              E-mail : j-rbeats@hotmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              2. Directeur de la publication
            </h2>

            <p className="leading-7">
              Le directeur de la publication est Jérôme RANTIER.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              3. Hébergement
            </h2>

            <p className="leading-7">
              Le site est hébergé par :
              <br />
              <strong className="text-white">Vercel Inc.</strong>
              <br />
              440 N Barranca Ave #4133
              <br />
              Covina, CA 91723
              <br />
              États-Unis
              <br />
              Téléphone : +1 559 288 7060
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              4. Propriété intellectuelle
            </h2>

            <p className="leading-7">
              Sauf mention contraire, l&apos;ensemble des contenus présents sur
              le site J-R Beats, notamment les compositions musicales,
              instrumentales, extraits audio, textes, éléments graphiques,
              logos et visuels, est protégé par les règles applicables en
              matière de propriété intellectuelle.
            </p>

            <p className="mt-4 leading-7">
              L&apos;achat d&apos;une licence sur J-R Beats n&apos;entraîne
              aucun transfert de propriété des œuvres, sauf disposition
              expressément prévue dans le contrat de licence correspondant.
              Les droits accordés à l&apos;acheteur sont ceux définis par la
              licence sélectionnée lors de la commande.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              5. Contact
            </h2>

            <p className="leading-7">
              Pour toute question concernant le site ou son contenu :
              <br />
              Téléphone : 06 01 32 18 91
              <br />
              E-mail : j-rbeats@hotmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              6. Médiation de la consommation
            </h2>

            <p className="leading-7">
              Conformément aux dispositions du Code de la consommation
              concernant « le processus de médiation des litiges de la
              consommation », après nous avoir sollicités et à défaut de
              réponse vous satisfaisant, vous avez la possibilité de recourir
              gratuitement à une procédure de médiation de la consommation
              auprès de :
            </p>

            <div className="mt-5 rounded-xl border border-purple-500/30 bg-purple-500/5 p-5 leading-7">
              <strong className="text-lg text-white">CM2C</strong>
              <br />
              49 rue de Ponthieu
              <br />
              75 008 PARIS
              <br />
              Tél : 01 89 47 00 14
              <br />
              Site internet :{" "}
              <a
                href="https://www.cm2c.net/declarer-un-litige.php"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-purple-400 underline transition hover:text-purple-300"
              >
                www.cm2c.net/declarer-un-litige.php
              </a>
              <br />
              Mail :{" "}
              <a
                href="mailto:litiges@cm2c.net"
                className="font-semibold text-purple-400 underline transition hover:text-purple-300"
              >
                litiges@cm2c.net
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}