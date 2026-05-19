import { LegalDoc } from '../../src/components/dashboards/LegalDoc';

const SECTIONS = [
  {
    heading: 'Acceptation des conditions',
    body: 'En utilisant Linky, tu acceptes les présentes conditions générales d\'utilisation. Elles régissent ta relation avec Linky SAS, société de droit guinéen.',
  },
  {
    heading: 'Compte utilisateur',
    body: 'Tu dois avoir au moins 18 ans et fournir des informations exactes. Tu es responsable de la sécurité de ton compte et de toute activité s\'y rapportant.',
  },
  {
    heading: 'Annonces et transactions',
    body: 'Tu t\'engages à publier uniquement des annonces conformes à la loi guinéenne. Linky agit comme intermédiaire technique et utilise un escrow pour sécuriser les paiements.',
  },
  {
    heading: 'Paiements et frais',
    body: 'Les paiements sont effectués via Mobile Money ou carte bancaire. Une commission peut s\'appliquer sur les transactions, clairement indiquée avant validation.',
  },
  {
    heading: 'Litiges',
    body: 'En cas de désaccord, tu peux ouvrir un litige directement dans l\'app. Notre équipe de médiation intervient dans un délai de 48 heures pour proposer une résolution.',
  },
  {
    heading: 'Contenus interdits',
    body: 'Sont interdits : produits illicites, contenus violents ou haineux, contrefaçons, armes, drogues, services illégaux. Toute annonce non conforme sera retirée et le compte sanctionné.',
  },
  {
    heading: 'Limitation de responsabilité',
    body: 'Linky n\'est pas partie aux transactions entre utilisateurs. Notre responsabilité se limite à la mise à disposition de la plateforme et à la médiation des litiges.',
  },
  {
    heading: 'Modification des conditions',
    body: 'Nous pouvons modifier ces conditions à tout moment. Les changements substantiels te seront notifiés par email ou notification in-app.',
  },
  {
    heading: 'Droit applicable',
    body: 'Les présentes conditions sont régies par le droit guinéen. Tout différend sera soumis aux tribunaux compétents de Conakry.',
  },
];

export default function TermsRoute() {
  return <LegalDoc title="Conditions générales" updated="15 mai 2026" sections={SECTIONS} />;
}
