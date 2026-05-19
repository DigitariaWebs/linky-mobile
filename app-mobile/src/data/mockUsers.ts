import type { User } from './types';
import { photos } from './photos';

// The demo "current user" — Mariama from Conakry.
export const CURRENT_USER_ID = 'u_mariama';

export const mockUsers: User[] = [
  {
    id: CURRENT_USER_ID,
    name: 'Mariama Diallo',
    photo: photos.woman1,
    city: 'Conakry',
    country: 'GN',
    kycVerified: true,
    diaspora: false,
    phone: '+224622551288',
    rating: 4.9,
    roles: ['buyer', 'seller'],
  },
  {
    id: 'u_aissatou',
    name: 'Aïssatou Bah',
    photo: photos.woman2,
    city: 'Conakry',
    country: 'GN',
    kycVerified: true,
    diaspora: false,
    phone: '+224620112233',
    rating: 4.9,
    roles: ['seller'],
  },
  {
    id: 'u_mamadou',
    name: 'Mamadou Bah',
    photo: photos.man1,
    city: 'Conakry',
    country: 'GN',
    kycVerified: true,
    diaspora: false,
    rating: 4.8,
    roles: ['agent'],
  },
  {
    id: 'u_ibrahima',
    name: 'Ibrahima Sow',
    photo: photos.man2,
    city: 'Kindia',
    country: 'GN',
    kycVerified: false,
    diaspora: false,
    rating: 4.5,
    roles: ['seller', 'buyer'],
  },
  {
    id: 'u_fatou',
    name: 'Fatou D.',
    photo: photos.woman3,
    city: 'Paris',
    country: 'FR',
    kycVerified: true,
    diaspora: true,
    email: 'fatou.balde@gmail.com',
    rating: 5,
    roles: ['buyer'],
  },
  {
    id: 'u_conakrytech',
    name: 'Conakry Tech',
    photo: photos.man2,
    city: 'Conakry',
    country: 'GN',
    kycVerified: true,
    diaspora: false,
    rating: 4.8,
    roles: ['seller'],
  },
  {
    id: 'u_bijouxsoie',
    name: 'Bijoux & Soie',
    photo: photos.woman4,
    city: 'Conakry',
    country: 'GN',
    kycVerified: true,
    diaspora: false,
    rating: 4.7,
    roles: ['seller'],
  },
  {
    id: 'u_modeconakry',
    name: 'Mode Conakry',
    photo: photos.woman3,
    city: 'Conakry',
    country: 'GN',
    kycVerified: true,
    diaspora: false,
    rating: 4.6,
    roles: ['seller'],
  },
];

export function getUser(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}
