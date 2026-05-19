import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from './Text';
import { haptic } from '../../lib/haptics';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: SegmentOption<T>[];
  onChange: (v: T) => void;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.bgSunken,
        borderRadius: 999,
        padding: 4,
        flexDirection: 'row',
        gap: 2,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => {
              haptic.selection();
              onChange(opt.value);
            }}
            style={{
              flex: 1,
              height: 36,
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active ? colors.bgElev : 'transparent',
              shadowColor: '#000',
              shadowOpacity: active ? 0.06 : 0,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 1 },
              elevation: active ? 1 : 0,
            }}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={{ fontSize: 13, fontWeight: '600', color: active ? colors.text : colors.textMuted }}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
