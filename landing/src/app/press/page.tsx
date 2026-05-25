import type { Metadata } from 'next';
import { PageShell } from '@/components/landing/PageShell';

export const metadata: Metadata = {
  title: 'Presse',
  description:
    'Kit presse Linky : logos, captures d\'écran, faits clés, contact relations presse.',
};

const FACTS = [
  { l: 'Fondée', v: '2025 · Conakry' },
  { l: 'Co-fondateurs', v: 'Aïssatou Diallo, Mamadou Bah' },
  { l: 'Utilisateurs actifs', v: '18 420 (mai 2026)' },
  { l: 'GMV mensuel', v: '184 M GNF (~16 700 €)' },
  { l: 'Couverture', v: '17 villes en Guinée + diaspora' },
  { l: 'Levée seed', v: '600 k€ (février 2026)' },
];

const COVERAGE = [
  {
    outlet: 'Africanews',
    title: 'En Guinée, Linky veut sécuriser le commerce en ligne',
    date: 'Avril 2026',
  },
  {
    outlet: 'TechCabal',
    title: 'Linky raises $650k to bring escrow to Guinea\'s marketplace',
    date: 'Mars 2026',
  },
  {
    outlet: 'Jeune Afrique',
    title: 'L\'app guinéenne qui rivalise avec Jumia',
    date: 'Mars 2026',
  },
  {
    outlet: 'RFI Afrique',
    title: 'Interview avec Aïssatou Diallo, CEO de Linky',
    date: 'Février 2026',
  },
];

export default function PressPage() {
  return (
    <PageShell
      eyebrow="Presse & médias"
      title="Tout ce qu'il faut pour parler de Linky."
      subtitle="Logos officiels, captures d'écran haute résolution, faits clés et contact direct. Servez-vous."
    >
      {/* Quick contact */}
      <div className="rounded-3xl bg-[#0E1311] p-8 text-white md:p-10">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Contact relations presse
            </h2>
            <p className="mt-2 max-w-md text-white/70">
              On répond en moins de 24 h en semaine, en français ou en anglais.
            </p>
          </div>
          <a
            href="mailto:press@linky.gn"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#e8a53d] px-6 text-sm font-bold text-[#0E1311] hover:opacity-90"
          >
            press@linky.gn
          </a>
        </div>
      </div>

      {/* Facts */}
      <h2 className="font-display mt-16 text-3xl font-bold tracking-tight md:text-4xl">
        Faits clés.
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {FACTS.map((f) => (
          <div
            key={f.l}
            className="rounded-2xl bg-white p-5 ring-1 ring-[#E5DED1]"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C9590]">
              {f.l}
            </div>
            <div className="mt-1 text-lg font-bold text-[#0E1311]">{f.v}</div>
          </div>
        ))}
      </div>

      {/* Brand kit */}
      <h2 className="font-display mt-16 text-3xl font-bold tracking-tight md:text-4xl">
        Kit de marque.
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { t: 'Logos (SVG + PNG)', s: 'Versions claire et foncée, monochrome.' },
          { t: 'Captures écran', s: '12 captures HD : home, marketplace, KYC.' },
          { t: 'Vidéo produit', s: '90 secondes · 1080p · sous-titres FR/EN.' },
        ].map((k) => (
          <a
            key={k.t}
            href="#"
            className="block rounded-2xl bg-white p-6 ring-1 ring-[#E5DED1] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_rgba(14,19,17,0.15)]"
          >
            <h3 className="font-display text-lg font-bold tracking-tight">
              {k.t}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5e6864]">{k.s}</p>
            <div className="mt-4 text-xs font-bold text-[#0e6e55]">
              Télécharger →
            </div>
          </a>
        ))}
      </div>

      {/* Coverage */}
      <h2 className="font-display mt-16 text-3xl font-bold tracking-tight md:text-4xl">
        On en parle.
      </h2>
      <div className="mt-8 space-y-3">
        {COVERAGE.map((c) => (
          <a
            key={c.title}
            href="#"
            className="flex items-center gap-4 rounded-xl bg-white p-5 ring-1 ring-[#E5DED1] hover:ring-[#0e6e55]/50"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#0e6e55]">
              {c.outlet}
            </div>
            <div className="h-1 w-1 rounded-full bg-[#D4CCBA]" />
            <div className="flex-1 font-medium">{c.title}</div>
            <div className="text-xs text-[#8C9590]">{c.date}</div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
