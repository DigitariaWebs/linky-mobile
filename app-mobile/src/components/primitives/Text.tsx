import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

type Variant =
  | 'dispXl'
  | 'dispL'
  | 'titleL'
  | 'titleM'
  | 'bodyL'
  | 'bodyM'
  | 'bodyMSemibold'
  | 'caption'
  | 'micro';

type Tone = 'default' | 'muted' | 'faint' | 'primary' | 'accent' | 'success' | 'danger' | 'inverse';

export interface TextProps extends RNTextProps {
  variant?: Variant;
  tone?: Tone;
  tabnum?: boolean;
  center?: boolean;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}

export function Text({
  variant = 'bodyM',
  tone = 'default',
  tabnum,
  center,
  weight,
  style,
  children,
  ...rest
}: TextProps) {
  const { colors, text } = useTheme();
  const t: TextStyle = { ...text[variant] };
  if (tabnum) t.fontVariant = ['tabular-nums'];
  if (center) t.textAlign = 'center';
  switch (tone) {
    case 'default':
      t.color = colors.text;
      break;
    case 'muted':
      t.color = colors.textMuted;
      break;
    case 'faint':
      t.color = colors.textFaint;
      break;
    case 'primary':
      t.color = colors.primary;
      break;
    case 'accent':
      t.color = colors.accent;
      break;
    case 'success':
      t.color = colors.success;
      break;
    case 'danger':
      t.color = colors.danger;
      break;
    case 'inverse':
      t.color = '#FFFFFF';
      break;
  }
  if (weight) {
    const map: Record<NonNullable<TextProps['weight']>, TextStyle['fontWeight']> = {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    };
    t.fontWeight = map[weight];
  }
  return (
    <RNText style={[t, style]} {...rest}>
      {children}
    </RNText>
  );
}
