import type { Metadata } from 'next';
import { PageShell, LegalSections } from '@/components/landing/PageShell';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Informations légales sur l\'éditeur du site Linky.',
};

export default function LegalNoticesPage() {
  return (
    <PageShell
      eyebrow="Légal · Mentions"
      title="Mentions légales."
      subtitle="Informations sur l'éditeur, l'hébergeur et les responsables de la publication."
    >
      <LegalSections
        updated="15 mai 2026"
        sections={[
          {
            heading: 'Éditeur du site',
            body: (
              <>
                <p>
                  <strong>Linky SAS</strong>
                  <br />
                  Société par actions simplifiée au capital de 10 000 €
                  <br />
                  Siège social : Immeuble Kaloum Tower, 12<sup>ème</sup> étage,
                  Avenue de la République, Conakry, Guinée
                  <br />
                  RCCM : CKY/2025/B/04812
                  <br />
                  NIF : 0042 7891 23
                </p>
              </>
            ),
          },
          {
            heading: 'Direction de la publication',
            body: (
              <p>
                Directrice de la publication : Aïssatou Diallo, en sa qualité
                de Présidente de Linky SAS.
              </p>
            ),
          },
          {
            heading: 'Hébergement',
            body: (
              <p>
                Vercel Inc.
                <br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA
                <br />
                privacy@vercel.com
              </p>
            ),
          },
          {
            heading: 'Propriété intellectuelle',
            body: (
              <p>
                L&apos;ensemble du contenu de ce site (textes, graphiques,
                logos, icônes, images, sons, logiciels) est la propriété
                exclusive de Linky SAS, à l&apos;exception des marques, logos
                ou contenus appartenant à d&apos;autres sociétés partenaires ou
                auteurs.
              </p>
            ),
          },
          {
            heading: 'Crédits',
            body: (
              <p>
                Photographies : Unsplash &amp; production interne. Icônes :{' '}
                <a href="https://lucide.dev" target="_blank" rel="noreferrer">
                  Lucide
                </a>
                . Typographies : Inter &amp; Space Grotesk.
              </p>
            ),
          },
          {
            heading: 'Données personnelles',
            body: (
              <p>
                Le traitement des données personnelles est décrit dans notre{' '}
                <a href="/legal/privacy">Politique de confidentialité</a>.
              </p>
            ),
          },
          {
            heading: 'Litiges',
            body: (
              <p>
                Tout litige relatif à l&apos;utilisation de ce site est soumis
                au droit guinéen. À défaut de résolution amiable, le litige
                sera porté devant les tribunaux compétents de Conakry.
              </p>
            ),
          },
        ]}
      />
    </PageShell>
  );
}
