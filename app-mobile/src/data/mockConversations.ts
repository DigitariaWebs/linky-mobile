import type { Conversation, Message, AppNotification } from './types';

const minsAgo = (n: number) => new Date(Date.now() - n * 60_000).toISOString();
const hoursAgo = (n: number) => new Date(Date.now() - n * 3600_000).toISOString();
const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();

export const mockConversations: Conversation[] = [
  {
    id: 'c_aissatou',
    participants: ['u_mariama', 'u_aissatou'],
    otherUserId: 'u_aissatou',
    pinnedListingId: 'p_perfume',
    pinnedListingKind: 'product',
    lastMessage: 'Bonjour, il est encore disponible ?',
    lastAt: minsAgo(2),
    unread: 2,
  },
  {
    id: 'c_mamadou',
    participants: ['u_mariama', 'u_mamadou'],
    otherUserId: 'u_mamadou',
    pinnedListingId: 'pr_apt_kaloum',
    pinnedListingKind: 'property',
    lastMessage: 'Je peux organiser une visite samedi à 10h',
    lastAt: hoursAgo(1),
    unread: 1,
  },
  {
    id: 'c_conakrytech',
    participants: ['u_mariama', 'u_conakrytech'],
    otherUserId: 'u_conakrytech',
    pinnedListingId: 'p_iphone',
    pinnedListingKind: 'product',
    lastMessage: 'Tu : Merci, je passe demain',
    lastAt: daysAgo(1),
    unread: 0,
  },
  {
    id: 'c_ibrahima',
    participants: ['u_mariama', 'u_ibrahima'],
    otherUserId: 'u_ibrahima',
    pinnedListingId: 'p_sneakers',
    pinnedListingKind: 'product',
    lastMessage: 'Le prix est négociable ?',
    lastAt: daysAgo(1),
    unread: 0,
  },
  {
    id: 'c_fatou',
    participants: ['u_mariama', 'u_fatou'],
    otherUserId: 'u_fatou',
    lastMessage: 'J\'envoie ma sœur récupérer le parfum jeudi',
    lastAt: daysAgo(5),
    unread: 0,
  },
];

export const mockMessagesByConversation: Record<string, Message[]> = {
  c_aissatou: [
    {
      id: 'm_1',
      conversationId: 'c_aissatou',
      senderId: 'u_mariama',
      body: 'Bonjour ! Le parfum est-il toujours disponible ?',
      at: hoursAgo(2),
      seen: true,
    },
    {
      id: 'm_2',
      conversationId: 'c_aissatou',
      senderId: 'u_aissatou',
      body: 'Oui Mariama, je le réserve pour toi. Tu peux passer demain ?',
      at: hoursAgo(1.9),
      seen: true,
    },
    {
      id: 'm_3',
      conversationId: 'c_aissatou',
      senderId: 'u_mariama',
      body: 'Parfait, je passe entre 14h et 16h. À demain !',
      at: hoursAgo(1.8),
      seen: true,
    },
    {
      id: 'm_4',
      conversationId: 'c_aissatou',
      senderId: 'u_aissatou',
      body: 'À demain 🌹',
      at: hoursAgo(1.7),
      seen: false,
    },
  ],
};

export const mockNotifications: AppNotification[] = [
  {
    id: 'n_1',
    category: 'order',
    title: 'Paiement reçu',
    body: 'Mamadou a payé pour ton iPhone 12 Pro · 4 800 000 GNF',
    at: minsAgo(2),
    read: false,
    iconHint: 'check',
  },
  {
    id: 'n_2',
    category: 'message',
    title: 'Aïssatou B.',
    body: 'Bonjour, il est encore disponible ?',
    at: minsAgo(15),
    read: false,
    iconHint: 'msg',
  },
  {
    id: 'n_3',
    category: 'promo',
    title: 'Boost gratuit !',
    body: 'Ton annonce \'Robe wax\' a été boostée gratuitement pour 24h',
    at: hoursAgo(1),
    read: true,
    iconHint: 'bolt',
  },
  {
    id: 'n_4',
    category: 'system',
    title: 'Nouvel avis 5★',
    body: 'Fatou D. a laissé un avis 5★ sur ta boutique',
    at: daysAgo(1),
    read: true,
    iconHint: 'star',
  },
  {
    id: 'n_5',
    category: 'order',
    title: 'Article favori',
    body: 'Ibrahima a ajouté ton iPhone 12 Pro à ses favoris',
    at: daysAgo(3),
    read: true,
    iconHint: 'heart',
  },
  {
    id: 'n_6',
    category: 'system',
    title: 'KYC validé',
    body: 'Tu es maintenant vendeuse vérifiée. Le badge est visible sur ton profil.',
    at: daysAgo(3),
    read: true,
    iconHint: 'shield',
  },
];
