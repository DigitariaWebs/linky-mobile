import { View, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { I } from '../../icons/Icon';
import { Text } from '../primitives/Text';

export function SearchPill({
  placeholder = 'Cherche un produit, un logement…',
  onPress,
  onCameraPress,
}: {
  placeholder?: string;
  onPress?: () => void;
  onCameraPress?: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginHorizontal: 16,
        height: 44,
        borderRadius: 999,
        backgroundColor: colors.bgElev,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
      }}
      accessibilityRole="search"
    >
      <I.search size={18} color={colors.textMuted} />
      <Text variant="bodyM" tone="faint" style={{ marginLeft: 10, flex: 1 }}>
        {placeholder}
      </Text>
      <Pressable
        onPress={onCameraPress}
        style={{
          width: 34,
          height: 34,
          borderRadius: 999,
          backgroundColor: colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        accessibilityLabel="Recherche visuelle"
      >
        <I.camera size={16} color={colors.primary} />
      </Pressable>
    </Pressable>
  );
}
