export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-black uppercase">
          Politique de{" "}
          <span className="text-purple-500">confidentialité</span>
        </h1>

        <p className="mb-12 text-sm text-zinc-500">
          Informations relatives au traitement des données personnelles sur
          J-R Beats.
        </p>

        <div className="space-y-10 text-zinc-300">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              1. Responsable du traitement
            </h2>

            <p className="leading-7">
              Le responsable du traitement des données personnelles collectées
              sur le site J-R Beats est :
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
              E-mail : j-rbeats@hotmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              2. Données personnelles traitées
            </h2>

            <p className="leading-7">
              Dans le cadre de l&apos;utilisation du site et de la réalisation
              des commandes, J-R Beats peut traiter notamment les catégories
              de données suivantes :
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
              <li>nom et prénom ;</li>
              <li>adresse e-mail ;</li>
              <li>adresse de facturation ;</li>
              <li>informations relatives au compte client ;</li>
              <li>historique et contenu des commandes ;</li>
              <li>informations nécessaires à la facturation ;</li>
              <li>
                informations relatives aux licences achetées et aux
                consentements associés à la commande ;
              </li>
              <li>
                informations techniques strictement nécessaires au
                fonctionnement, à l&apos;authentification et à la sécurité du
                service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              3. Données de paiement
            </h2>

            <p className="leading-7">
              Les paiements sont réalisés par l&apos;intermédiaire de Stripe.
              Les informations de carte bancaire nécessaires au paiement sont
              traitées directement par Stripe et ne sont pas enregistrées
              directement par J-R Beats.
            </p>

            <p className="mt-4 leading-7">
              J-R Beats reçoit uniquement les informations nécessaires à la
              confirmation et au suivi de la transaction, notamment le statut
              du paiement, le montant payé, la référence de la transaction et
              les informations de facturation nécessaires à la commande.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              4. Finalités des traitements
            </h2>

            <p className="leading-7">
              Les données personnelles sont traitées notamment afin de :
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
              <li>créer et gérer les comptes clients ;</li>
              <li>traiter et exécuter les commandes ;</li>
              <li>gérer les paiements et leur confirmation ;</li>
              <li>établir et conserver les factures ;</li>
              <li>gérer les licences associées aux achats ;</li>
              <li>mettre à disposition les fichiers achetés ;</li>
              <li>envoyer les confirmations de commande et factures ;</li>
              <li>assurer le support et traiter les réclamations ;</li>
              <li>prévenir les abus et sécuriser le service ;</li>
              <li>assurer le bon fonctionnement du site ;</li>
              <li>respecter les obligations légales applicables.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              5. Bases juridiques
            </h2>

            <p className="leading-7">
              Les traitements nécessaires à la gestion du compte, de la
              commande, du paiement, de la livraison des fichiers et des
              licences sont réalisés principalement sur la base de
              l&apos;exécution du contrat ou de mesures précontractuelles.
            </p>

            <p className="mt-4 leading-7">
              Certaines données sont également conservées afin de respecter
              les obligations légales de J-R Beats, notamment en matière
              comptable et fiscale.
            </p>

            <p className="mt-4 leading-7">
              Lorsque cela est applicable, certains traitements nécessaires à
              la sécurité, à la prévention des abus ou à la défense des droits
              de J-R Beats peuvent reposer sur son intérêt légitime.
            </p>

            <p className="mt-4 leading-7">
              Lorsqu&apos;un traitement nécessite le consentement de
              l&apos;utilisateur, celui-ci est recueilli dans les conditions
              prévues par la réglementation applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              6. Destinataires et prestataires
            </h2>

            <p className="leading-7">
              Les données sont accessibles à J-R Beats ainsi qu&apos;aux
              prestataires techniques strictement nécessaires au
              fonctionnement du service.
            </p>

            <ul className="mt-4 list-disc space-y-3 pl-6 leading-7">
              <li>
                <strong className="text-white">Stripe</strong> : traitement
                sécurisé des paiements et informations nécessaires aux
                transactions ;
              </li>

              <li>
                <strong className="text-white">Supabase</strong> :
                authentification des utilisateurs, base de données et stockage
                de certains fichiers ;
              </li>

              <li>
                <strong className="text-white">Vercel</strong> : hébergement et
                mise à disposition du site ;
              </li>

              <li>
                <strong className="text-white">Resend</strong> : envoi des
                e-mails transactionnels, notamment les confirmations de
                commande et factures ;
              </li>

              <li>
                <strong className="text-white">Cloudflare R2</strong> :
                stockage et mise à disposition sécurisée de certains fichiers
                numériques achetés.
              </li>
            </ul>

            <p className="mt-4 leading-7">
              Ces prestataires peuvent traiter uniquement les données
              nécessaires à l&apos;exécution des services concernés, selon
              leurs rôles respectifs et les conditions contractuelles
              applicables.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              7. Transferts de données hors de l&apos;Union européenne
            </h2>

            <p className="leading-7">
              Certains prestataires techniques utilisés par J-R Beats sont des
              sociétés internationales et peuvent, selon les services
              concernés, traiter ou rendre accessibles certaines données
              depuis des pays situés en dehors de l&apos;Espace économique
              européen.
            </p>

            <p className="mt-4 leading-7">
              Lorsque la réglementation l&apos;exige, ces transferts sont
              encadrés par un mécanisme reconnu par le droit applicable,
              notamment une décision d&apos;adéquation ou des garanties
              contractuelles appropriées telles que les clauses contractuelles
              types adoptées par la Commission européenne.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              8. Durée de conservation
            </h2>

            <p className="leading-7">
              Les données liées au compte client sont conservées pendant la
              durée d&apos;utilisation du compte, puis pendant la durée
              nécessaire au respect des obligations légales ou à la défense
              des droits de J-R Beats.
            </p>

            <p className="mt-4 leading-7">
              Les informations relatives aux commandes, paiements, licences et
              justificatifs associés peuvent être conservées pendant la durée
              nécessaire à l&apos;exécution du contrat, au traitement
              d&apos;éventuelles réclamations et à la constatation,
              l&apos;exercice ou la défense de droits en justice.
            </p>

            <p className="mt-4 leading-7">
              Les factures et documents comptables sont conservés pendant la
              durée légale applicable, pouvant notamment atteindre dix ans à
              compter de la clôture de l&apos;exercice concerné.
            </p>

            <p className="mt-4 leading-7">
              Certaines données peuvent être archivées au-delà de leur durée
              d&apos;utilisation courante lorsqu&apos;une obligation légale le
              nécessite.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              9. Droits des personnes
            </h2>

            <p className="leading-7">
              Dans les conditions prévues par la réglementation applicable,
              toute personne concernée peut notamment disposer d&apos;un droit
              d&apos;accès, de rectification, d&apos;effacement, de limitation
              du traitement, d&apos;opposition et, lorsque les conditions sont
              réunies, d&apos;un droit à la portabilité de ses données.
            </p>

            <p className="mt-4 leading-7">
              Lorsqu&apos;un traitement repose sur le consentement, celui-ci
              peut être retiré à tout moment, sans remettre en cause la
              licéité du traitement effectué avant son retrait.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              10. Exercice des droits
            </h2>

            <p className="leading-7">
              Pour exercer ses droits ou poser une question concernant ses
              données personnelles, l&apos;utilisateur peut contacter :
              <br />
              <strong className="text-white">
                j-rbeats@hotmail.com
              </strong>
            </p>

            <p className="mt-4 leading-7">
              Une preuve d&apos;identité pourra être demandée uniquement
              lorsqu&apos;elle est nécessaire pour vérifier l&apos;identité
              de la personne à l&apos;origine de la demande.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              11. Réclamation auprès de la CNIL
            </h2>

            <p className="leading-7">
              Si une personne estime, après avoir contacté J-R Beats, que ses
              droits relatifs à la protection de ses données ne sont pas
              respectés, elle peut introduire une réclamation auprès de la
              Commission nationale de l&apos;informatique et des libertés
              (CNIL).
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              12. Sécurité
            </h2>

            <p className="leading-7">
              J-R Beats met en œuvre des mesures techniques et
              organisationnelles destinées à protéger les données personnelles
              contre notamment l&apos;accès non autorisé, la perte,
              l&apos;altération ou la divulgation non autorisée.
            </p>

            <p className="mt-4 leading-7">
              Les liens permettant l&apos;accès à certains fichiers achetés
              peuvent notamment être temporaires et sécurisés afin de limiter
              les accès non autorisés.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              13. Cookies et traceurs
            </h2>

            <p className="leading-7">
              Le site peut utiliser des cookies ou autres mécanismes de
              stockage strictement nécessaires à son fonctionnement,
              notamment pour assurer certaines fonctionnalités techniques,
              l&apos;authentification ou la sécurité du service.
            </p>

            <p className="mt-4 leading-7">
              À la date de la présente politique, J-R Beats n&apos;utilise pas
              de traceurs publicitaires ou de mesure d&apos;audience
              nécessitant le consentement de l&apos;utilisateur.
            </p>

            <p className="mt-4 leading-7">
              Si de tels traceurs sont ajoutés ultérieurement, les informations
              et mécanismes de consentement nécessaires seront mis en place
              avant leur utilisation, conformément à la réglementation
              applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              14. Modification de la politique
            </h2>

            <p className="leading-7">
              La présente politique de confidentialité peut être modifiée afin
              de tenir compte des évolutions du site, des services proposés ou
              des obligations légales et réglementaires applicables.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">
              15. Contact
            </h2>

            <p className="leading-7">
              Pour toute question relative à la présente politique de
              confidentialité :
              <br />
              <strong className="text-white">
                j-rbeats@hotmail.com
              </strong>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}