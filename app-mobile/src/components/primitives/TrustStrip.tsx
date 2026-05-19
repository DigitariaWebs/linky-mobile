import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { I } from '../../icons/Icon';
import { Text } from './Text';
import type { ReactNode } from 'react';

export function TrustStrip({
  children,
  tone = 'primary',
}: {
  children: ReactNode;
  tone?: 'primary' | 'accent' | 'danger' | 'info';
}) {
  const { colors, radii } = useTheme();
  const palette = {
    primary: { bg: colors.primarySoft, fg: colors.primaryDeep, icon: colors.primary },
    accent: { bg: colors.accentSoft, fg: colors.accentText, icon: colors.accentText },
    danger: { bg: 'rgba(209,79,60,0.10)', fg: colors.danger, icon: colors.danger },
    info: { bg: 'rgba(58,124,168,0.12)', fg: colors.info, icon: colors.info },
  }[tone];
  const Icon = tone === 'accent' ? I.warn : I.shield;
  return (
    <View
      style={{
        padding: 12,
        backgroundColor: palette.bg,
        borderRadius: radii.md,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
      }}
    >
      <Icon size={18} color={palette.icon} />
      <Text
        style={{
          flex: 1,
          fontSize: 11.5,
          color: palette.fg,
          lineHeight: 16,
        }}
      >
        {children}
      </Text>
    </View>
  );
}
