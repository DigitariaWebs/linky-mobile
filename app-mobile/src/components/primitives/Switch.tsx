import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { haptic } from '../../lib/haptics';

export function Switch({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  const { colors } = useTheme();
  const x = useSharedValue(value ? 1 : 0);
  useEffect(() => {
    x.value = withTiming(value ? 1 : 0, { duration: 160 });
  }, [value, x]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value * 18 }],
  }));
  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: x.value > 0.5 ? colors.primary : colors.borderStrong,
  }));

  return (
    <Pressable
      onPress={() => {
        haptic.selection();
        onChange(!value);
      }}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      hitSlop={8}
    >
      <Animated.View
        style={[
          { width: 42, height: 24, borderRadius: 999, padding: 3, justifyContent: 'center' },
          trackStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: 18,
              height: 18,
              borderRadius: 999,
              backgroundColor: '#FFFFFF',
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
            },
            thumbStyle,
          ]}
        />
        <View pointerEvents="none" />
      </Animated.View>
    </Pressable>
  );
}
