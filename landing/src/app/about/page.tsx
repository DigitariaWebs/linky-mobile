import type { Metadata } from 'next';
import { PageShell, Prose } from '@/components/landing/PageShell';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Linky est une startup guinéenne qui réunit marketplace et immobilier dans une seule app, pour un marché plus sûr et plus accessible.',
};

const VALUES = [
  {
    n: '01',
    t: 'Local d\'abord',
    d: 'Conçu à Conakry, par et pour des Guinéens. Mobile Money est une fonctionnalité de premier rang, pas un add-on.',
  },
  {
    n: '02',
    t: 'Confiance par défaut',
    d: 'KYC obligatoire, escrow sur chaque transaction, médiation humaine en 48 h. La sécurité n\'est pas un upsell.',
  },
  {
    n: '03',
    t: 'Diaspora bienvenue',
    d: 'Paiement en €, livraison vers le pays, visites vidéo pour l\'immobilier. Conakry à portée de main depuis Paris.',
  },
  {
    n: '04',
    t: 'Vitesse honnête',
    d: 'On expédie vite, mais on dit ce qui n\'est pas prêt. Pas de promesses de feuille de route en l\'air.',
  },
];

const TEAM = [
  { n: 'Aïssatou D.', r: 'Co-fondatrice · CEO', city: 'Conakry' },
  { n: 'Mamadou B.', r: 'Co-fondateur · CTO', city: 'Conakry / Paris' },
  { n: 'Fatou C.', r: 'Head of Trust & Safety', city: 'Conakry' },
  { n: 'Ibrahima S.', r: 'Head of Design', city: 'Dakar' },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="L'équipe"
      title="On construit Linky en Guinée, pour la Guinée."
      subtitle="On est une équipe de neuf à Conakry, Paris et Dakar. Notre obsession : rendre le commerce et l'immobilier guinéens plus simples, plus sûrs, plus fluides."
    >
      <Prose>
        <p>
          Linky est née en 2025 d&apos;une frustration partagée : trop d&apos;annonces
          dispersées sur WhatsApp, Facebook et Jumia, trop d&apos;arnaques, pas
          assez de moyens de paiement sécurisés. On a passé{' '}
          <strong>18 mois à parler aux acheteurs, vendeurs, et agents immobiliers</strong>{' '}
          guinéens avant d&apos;écrire la première ligne de code.
        </p>
        <p>
          Aujourd&apos;hui Linky réunit marketplace et immobilier dans une seule
          app, avec wallet intégré, escrow Mobile Money, et un fil Découvrir
          TikTok-style. On grandit avec la communauté qui l&apos;utilise.
        </p>
      </Prose>

      <h2 className="font-display mt-16 text-3xl font-bold tracking-tight text-[#0E1311] md:text-4xl">
        Ce qui nous tient.
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {VALUES.map((v) => (
          <div
            key={v.n}
            className="rounded-2xl bg-white p-6 ring-1 ring-[#E5DED1]"
          >
            <div className="font-display text-sm font-bold text-[#0e6e55]">
              {v.n}
            </div>
            <h3 className="font-display mt-2 text-xl font-bold tracking-tight">
              {v.t}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#5e6864]">
              {v.d}
            </p>
          </div>
        ))}
      </div>

      <h2 className="font-display mt-16 text-3xl font-bold tracking-tight text-[#0E1311] md:text-4xl">
        Quelques visages.
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {TEAM.map((t) => (
          <div
            key={t.n}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-[#E5DED1]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFE8DA] font-bold text-[#0E1311]">
              {t.n
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div className="font-bold">{t.n}</div>
              <div className="text-sm text-[#5e6864]">
                {t.r} · {t.city}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-[#5e6864]">
        + 5 autres personnes en ingénierie, support et logistique. Voir les{' '}
        <a href="/careers" className="font-bold text-[#0e6e55] hover:underline">
          postes ouverts
        </a>
        .
      </p>
    </PageShell>
  );
}
