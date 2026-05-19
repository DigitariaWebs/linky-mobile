import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '../lib/storage';

export type Language = 'fr' | 'en' | 'pular' | 'sousou';

interface PrefsState {
  dataSaver: boolean;
  notifications: boolean;
  language: Language;
  setDataSaver: (v: boolean) => void;
  setNotifications: (v: boolean) => void;
  setLanguage: (v: Language) => void;
}

export const usePrefs = create<PrefsState>((set) => ({
  dataSaver: storage.getBoolean(STORAGE_KEYS.dataSaver) ?? false,
  notifications: storage.getBoolean(STORAGE_KEYS.notificationsEnabled) ?? true,
  language: (storage.getString(STORAGE_KEYS.language) as Language) ?? 'fr',
  setDataSaver: (v) => {
    storage.set(STORAGE_KEYS.dataSaver, v);
    set({ dataSaver: v });
  },
  setNotifications: (v) => {
    storage.set(STORAGE_KEYS.notificationsEnabled, v);
    set({ notifications: v });
  },
  setLanguage: (v) => {
    storage.set(STORAGE_KEYS.language, v);
    set({ language: v });
  },
}));
