import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../primitives/Text';
import type { IconKey } from '../../icons/Icon';
import { I } from '../../icons/Icon';

export type CategoryTint = 'primary' | 'accent' | 'cream' | 'info';

export function CategoryTile({
  icon,
  label,
  tint = 'primary',
  onPress,
  width = 88,
}: {
  icon: IconKey;
  label: string;
  tint?: CategoryTint;
  onPress?: () => void;
  width?: number;
}) {
  const { colors, radii } = useTheme();
  const palette = {
    primary: { bg: colors.primarySoft, fg: colors.primary },
    accent: { bg: colors.accentSoft, fg: colors.accentText },
    cream: { bg: colors.bgSunken, fg: colors.text },
    info: { bg: 'rgba(58,124,168,0.12)', fg: colors.info },
  }[tint];
  const Icon = I[icon];
  return (
    <Pressable
      onPress={onPress}
      style={{ alignItems: 'center', gap: 6, width }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View
        style={{
          width: width - 18,
          height: width - 18,
          backgroundColor: palette.bg,
          borderRadius: radii.xl,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={26} color={palette.fg} />
      </View>
      <Text style={{ fontSize: 11, fontWeight: '500', textAlign: 'center', color: colors.text }} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
