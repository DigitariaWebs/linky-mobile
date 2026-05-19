import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export function ProgressDots({ total, current }: { total: number; current: number }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 5 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 4,
            backgroundColor: i <= current ? colors.primary : colors.border,
          }}
        />
      ))}
    </View>
  );
}

export function PageDots({ total, current }: { total: number; current: number }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === current ? 22 : 5,
            height: 5,
            borderRadius: 4,
            backgroundColor: i === current ? colors.primary : colors.borderStrong,
          }}
        />
      ))}
    </View>
  );
}
