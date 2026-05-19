import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from './Text';
import { I } from '../../icons/Icon';

export type BadgeTone = 'verified' | 'boost' | 'new' | 'reserved' | 'sold' | 'promo' | 'condition';

export function Badge({ tone, label }: { tone: BadgeTone; label?: string }) {
  const { colors } = useTheme();
  switch (tone) {
    case 'verified':
      return (
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.95)',
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 13,
              height: 13,
              borderRadius: 999,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <I.check size={8} color="#FFFFFF" stroke={3} />
          </View>
          <Text style={{ fontSize: 10, fontWeight: '600', color: colors.accent }}>
            {label ?? 'Vérifié'}
          </Text>
        </View>
      );
    case 'boost':
      return (
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: colors.accent,
            flexDirection: 'row',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <I.star size={9} color="#2A1A05" />
          <Text style={{ fontSize: 9, fontWeight: '700', color: '#2A1A05', letterSpacing: 0.4 }}>
            BOOST
          </Text>
        </View>
      );
    case 'new':
      return (
        <View
          style={{
            paddingHorizontal: 9,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: colors.info,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: '600', color: '#FFFFFF' }}>{label ?? 'Nouveau'}</Text>
        </View>
      );
    case 'reserved':
      return (
        <View
          style={{
            paddingHorizontal: 9,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: colors.info,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: '600', color: '#FFFFFF' }}>{label ?? 'Réservé'}</Text>
        </View>
      );
    case 'sold':
      return (
        <View
          style={{
            paddingHorizontal: 9,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.4 }}>
            {label ?? 'VENDU'}
          </Text>
        </View>
      );
    case 'promo':
      return (
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: colors.primarySoft,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: '600', color: colors.primary }}>
            {label ?? 'Promo'}
          </Text>
        </View>
      );
    case 'condition':
      return (
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
        >
          <Text style={{ fontSize: 9, fontWeight: '600', color: '#FFFFFF' }}>{label}</Text>
        </View>
      );
  }
}
