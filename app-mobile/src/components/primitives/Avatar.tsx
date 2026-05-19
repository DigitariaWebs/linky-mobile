import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '../../theme/ThemeProvider';
import { I } from '../../icons/Icon';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const SIZES: Record<AvatarSize, number> = { xs: 20, sm: 28, md: 36, lg: 48, xl: 64 };

export function Avatar({
  source,
  size = 'md',
  verified,
  online,
  style,
}: {
  source?: string;
  size?: AvatarSize;
  verified?: boolean;
  online?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const px = SIZES[size];
  return (
    <View style={[{ width: px, height: px }, style]}>
      <Image
        source={source}
        contentFit="cover"
        style={{ width: px, height: px, borderRadius: 999, backgroundColor: colors.bgSunken }}
        transition={120}
      />
      {verified && (
        <View
          style={{
            position: 'absolute',
            bottom: -1,
            right: -1,
            width: Math.max(14, px * 0.32),
            height: Math.max(14, px * 0.32),
            borderRadius: 999,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.bg,
          }}
        >
          <I.check size={Math.max(8, px * 0.18)} color="#FFFFFF" stroke={3} />
        </View>
      )}
      {online && !verified && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 11,
            height: 11,
            borderRadius: 999,
            backgroundColor: colors.success,
            borderWidth: 2,
            borderColor: colors.bg,
          }}
        />
      )}
    </View>
  );
}
