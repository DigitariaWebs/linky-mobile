import { LegalDoc } from '../../src/components/dashboards/LegalDoc';

const SECTIONS = [
  {
    heading: 'Données que nous collectons',
    body: 'Informations de compte (nom, téléphone, email, photo), données de localisation lorsque tu l\'autorises, contenu publié (annonces, messages, avis), données techniques (modèle d\'appareil, version OS) et données de paiement (chiffrées, jamais stockées en clair).',
  },
  {
    heading: 'Pourquoi nous les utilisons',
    body: 'Pour faire fonctionner l\'app, sécuriser les transactions, personnaliser ton expérience (si tu l\'autorises), prévenir la fraude, te contacter sur des sujets importants liés à ton compte.',
  },
  {
    heading: 'Partage de tes données',
    body: 'On ne vend jamais tes données. On les partage uniquement avec : prestataires techniques (hébergement, paiement, SMS), partenaires de livraison lorsque tu en bénéficies, autorités si la loi l\'exige.',
  },
  {
    heading: 'Tes droits',
    body: 'Tu peux à tout moment accéder à tes données, les modifier, les exporter, ou demander leur suppression définitive. Va dans Profil → Confidentialité → Mes données.',
  },
  {
    heading: 'Conservation',
    body: 'On garde tes données tant que ton compte est actif. Après suppression, certaines informations peuvent être conservées jusqu\'à 3 ans pour répondre à nos obligations légales et comptables.',
  },
  {
    heading: 'Sécurité',
    body: 'Tes données sont chiffrées en transit (TLS) et au repos. Les mots de passe ne sont jamais stockés en clair. Nos serveurs sont hébergés dans des datacenters certifiés ISO 27001.',
  },
  {
    heading: 'Cookies et identifiants',
    body: 'L\'app utilise des identifiants techniques pour fonctionner (session, préférences) et, si tu l\'autorises, des identifiants d\'analyse pour comprendre comment Linky est utilisé.',
  },
  {
    heading: 'Mineurs',
    body: 'Linky est réservée aux personnes de 18 ans et plus. Si tu découvres qu\'un compte appartient à un mineur, signale-le immédiatement à privacy@linky.gn.',
  },
  {
    heading: 'Contact',
    body: 'Toute question sur tes données : privacy@linky.gn. Notre Délégué à la Protection des Données te répond sous 30 jours.',
  },
];

export default function PrivacyPolicyRoute() {
  return <LegalDoc title="Politique de confidentialité" updated="15 mai 2026" sections={SECTIONS} />;
}
