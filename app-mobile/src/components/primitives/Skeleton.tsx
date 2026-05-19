import { useEffect } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';

export interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({ width = '100%', height = 12, radius = 8, style }: SkeletonProps) {
  const { colors } = useTheme();
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
  }, [p]);

  const animated = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(p.value, [0, 1], [colors.border, colors.bgElev]),
  }));

  return (
    <Animated.View
      style={[
        { width: width as number | `${number}%`, height, borderRadius: radius },
        animated,
        style,
      ]}
    />
  );
}

export function SkeletonCircle({ size = 36, style }: { size?: number; style?: StyleProp<ViewStyle> }) {
  return <Skeleton width={size} height={size} radius={999} style={style} />;
}

export function ProductCardSkeleton() {
  return (
    <View style={{ gap: 8 }}>
      <Skeleton height={160} radius={16} />
      <Skeleton width="80%" height={12} />
      <Skeleton width="60%" height={12} />
    </View>
  );
}
