import { View, type StyleProp, type ViewStyle, type ViewProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import type { ReactNode } from 'react';

export interface CardProps extends ViewProps {
  children?: ReactNode;
  elevated?: boolean;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, elevated, padding, style, ...rest }: CardProps) {
  const { colors, radii, shadows } = useTheme();
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radii.lg,
          padding,
        },
        elevated && shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
