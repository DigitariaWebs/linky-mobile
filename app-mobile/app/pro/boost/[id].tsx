import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import {
  Zap,
  Clock,
  Eye,
  TrendingUp,
  Heart,
  MessageCircle,
  X,
} from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProducts } from '../../../src/data/mockProducts';

export default function BoostDetailRoute() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = mockProducts[0]!;

  const BARS = [40, 55, 35, 70, 60, 80, 45, 90, 75, 100, 95, 88];

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Boost en cours" />

        {/* Boosted item */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 14,
              borderRadius: 20,
              backgroundColor: colors.card,
              borderWidth: 1.5,
              borderColor: colors.accent,
              flexDirection: 'row',
              gap: 14,
              alignItems: 'center',
            }}
          >
            <View style={{ position: 'relative' }}>
              <Image
                source={product.photos[0]}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 14,
                  backgroundColor: colors.bgSunken,
                }}
                contentFit="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  backgroundColor: colors.accent,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2.5,
                  borderColor: colors.card,
                }}
              >
                <Zap size={12} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14.5,
                  fontWeight: '700',
                  color: colors.text,
                  letterSpacing: 0,
                  lineHeight: 18,
                  includeFontPadding: false,
                }}
                numberOfLines={2}
              >
                {product.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 6,
                }}
              >
                <Clock size={11} color={colors.accentText} strokeWidth={2.25} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: colors.accentText,
                    letterSpacing: 0,
                  }}
                >
                  Termine dans 3 jours
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stat row */}
        <View style={{ paddingHorizontal: 24, paddingTop: 14, flexDirection: 'row', gap: 10 }}>
          <Stat Icon={Eye} label="Vues" value="1 240" delta="+×3,2" />
          <Stat Icon={Heart} label="Favoris" value="58" delta="+×2,1" />
          <Stat Icon={MessageCircle} label="Messages" value="14" delta="+×4,0" />
        </View>

        {/* Chart */}
        <View style={{ paddingHorizontal: 24, paddingTop: 14 }}>
          <View
            style={{
              padding: 18,
              borderRadius: 20,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: colors.textFaint,
                letterSpacing: 0.5,
                lineHeight: 14,
                includeFontPadding: false,
              }}
            >
              VUES PAR JOUR · DEPUIS LE BOOST
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                height: 80,
                alignItems: 'flex-end',
                marginTop: 18,
              }}
            >
              {BARS.map((h, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    backgroundColor: i > 8 ? colors.accent : colors.primary,
                    borderRadius: 4,
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Stop boost */}
        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <Pressable
            onPress={() => {
              haptic.medium();
              router.back();
            }}
            style={{
              height: 52,
              borderRadius: 16,
              backgroundColor: 'rgba(209,79,60,0.08)',
              borderWidth: 1,
              borderColor: 'rgba(209,79,60,0.25)',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <X size={16} color={colors.danger} strokeWidth={2} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.danger,
                lineHeight: 17,
                includeFontPadding: false,
              }}
            >
              Stopper ce boost
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({
  Icon,
  label,
  value,
  delta,
}: {
  Icon: typeof Eye;
  label: string;
  value: string;
  delta: string;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        borderRadius: 16,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Icon size={14} color={colors.textMuted} strokeWidth={1.75} />
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: colors.textFaint,
          letterSpacing: 0.5,
          marginTop: 6,
        }}
      >
        {label.toUpperCase()}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
          marginTop: 2,
          fontVariant: ['tabular-nums'],
          letterSpacing: -0.2,
        }}
      >
        {value}
      </Text>
      <View
        style={{
          marginTop: 4,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <TrendingUp size={10} color={colors.success} strokeWidth={2.25} />
        <Text
          style={{
            fontSize: 11,
            fontWeight: '700',
            color: colors.success,
            letterSpacing: 0,
          }}
        >
          {delta}
        </Text>
      </View>
    </View>
  );
}
