import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '../lib/storage';
import { CURRENT_USER_ID, getUser } from '../data/mockUsers';
import type { User } from '../data/types';

type AuthChannel = 'phone' | 'email';
export type UserRole = 'buyer' | 'seller' | 'agent';
// UI ids used in profile-setup step 3 → canonical UserRole.
export const ROLE_FROM_UI: Record<'buy' | 'sell' | 'agent', UserRole> = {
  buy: 'buyer',
  sell: 'seller',
  agent: 'agent',
};

interface AuthState {
  user: User | null;
  isOnboarded: boolean;
  channel: AuthChannel;
  pendingPhone: string;
  roles: UserRole[];
  setChannel: (c: AuthChannel) => void;
  setPendingPhone: (p: string) => void;
  setRoles: (r: UserRole[]) => void;
  signIn: (userId?: string) => void;
  signOut: () => void;
  completeOnboarding: (roles?: UserRole[]) => void;
}

const initialDone = storage.getBoolean(STORAGE_KEYS.onboardingDone) ?? false;
const initialUserId = storage.getString(STORAGE_KEYS.currentUserId);

function loadRoles(): UserRole[] {
  const raw = storage.getString(STORAGE_KEYS.roles);
  if (!raw) return ['buyer'];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as UserRole[];
  } catch {
    // ignore
  }
  return ['buyer'];
}

function saveRoles(roles: UserRole[]) {
  storage.set(STORAGE_KEYS.roles, JSON.stringify(roles));
}

export const useAuth = create<AuthState>((set) => ({
  user: initialDone ? getUser(initialUserId ?? CURRENT_USER_ID) ?? null : null,
  isOnboarded: initialDone,
  channel: 'phone',
  pendingPhone: '+224 622 55 12 88',
  roles: loadRoles(),
  setChannel: (channel) => set({ channel }),
  setPendingPhone: (pendingPhone) => set({ pendingPhone }),
  setRoles: (roles) => {
    saveRoles(roles);
    set({ roles });
  },
  signIn: (userId = CURRENT_USER_ID) => {
    const user = getUser(userId) ?? null;
    storage.set(STORAGE_KEYS.currentUserId, userId);
    set({ user });
  },
  signOut: () => {
    storage.remove(STORAGE_KEYS.currentUserId);
    storage.set(STORAGE_KEYS.onboardingDone, false);
    set({ user: null, isOnboarded: false });
  },
  completeOnboarding: (roles) => {
    storage.set(STORAGE_KEYS.onboardingDone, true);
    const user = getUser(CURRENT_USER_ID) ?? null;
    storage.set(STORAGE_KEYS.currentUserId, CURRENT_USER_ID);
    if (roles && roles.length > 0) {
      saveRoles(roles);
      set({ isOnboarded: true, user, roles });
    } else {
      set({ isOnboarded: true, user });
    }
  },
}));
