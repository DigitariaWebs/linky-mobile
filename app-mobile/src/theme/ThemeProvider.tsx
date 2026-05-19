import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Appearance, View } from 'react-native';
import { colorScheme } from 'nativewind';
import {
  type Colors,
  type ThemeName,
  getColors,
  getShadows,
  radii,
  spacing,
  typography,
  easing,
} from './tokens';
import { storage, STORAGE_KEYS } from '../lib/storage';

export type ThemePreference = 'light' | 'dark' | 'system';

type Ctx = {
  theme: ThemeName;
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  colors: Colors;
  shadows: ReturnType<typeof getShadows>;
  radii: typeof radii;
  spacing: typeof spacing;
  text: typeof typography;
  easing: typeof easing;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const stored = storage.getString(STORAGE_KEYS.themePreference) as ThemePreference | undefined;
  const [preference, setPreferenceState] = useState<ThemePreference>(stored ?? 'system');
  const [systemTheme, setSystemTheme] = useState<ThemeName>(
    () => (Appearance.getColorScheme() ?? 'light') as ThemeName,
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme: cs }) => {
      setSystemTheme((cs ?? 'light') as ThemeName);
    });
    return () => sub.remove();
  }, []);

  const theme: ThemeName = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    colorScheme.set(theme);
  }, [theme]);

  const setPreference = (p: ThemePreference) => {
    setPreferenceState(p);
    storage.set(STORAGE_KEYS.themePreference, p);
  };

  const value = useMemo<Ctx>(
    () => ({
      theme,
      preference,
      setPreference,
      colors: getColors(theme),
      shadows: getShadows(theme),
      radii,
      spacing,
      text: typography,
      easing,
    }),
    [theme, preference],
  );

  return (
    <ThemeContext.Provider value={value}>
      <View style={{ flex: 1, backgroundColor: value.colors.bg }} className={theme}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
