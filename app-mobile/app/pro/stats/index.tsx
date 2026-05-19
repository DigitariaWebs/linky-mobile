import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MessageCircle,
  ShoppingBag,
  Wallet,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProducts } from '../../../src/data/mockProducts';
import { formatGNF } from '../../../src/lib/format';

type Period = '7j' | '30j' | '90j' | 'an';

const PERIODS: { id: Period; label: string }[] = [
  { id: '7j', label: '7 j' },
  { id: '30j', label: '30 j' },
  { id: '90j', label: '90 j' },
  { id: 'an', label: '1 an' },
];

const VIEW_BARS = [
  40, 55, 35, 70, 60, 80, 45, 90, 75, 60, 95, 70, 85, 100, 80, 75, 90, 65, 50, 85, 95, 70, 80, 100,
  90, 75, 65, 90, 85, 100,
];

export default function StatsRoute() {
  const { colors } = useTheme();
  const [period, setPeriod] = useState<Period>('30j');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Statistiques" subtitle="Tes performances en un coup d'œil." />

        {/* Period tabs */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 18,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              padding: 4,
              borderRadius: 999,
              backgroundColor: colors.bgSunken,
            }}
          >
            {PERIODS.map((p) => {
              const active = period === p.id;
              return (
                <Pressable
                  key={p.id}
                  onPress={() => {
                    haptic.selection();
                    setPeriod(p.id);
                  }}
                  style={{
                    flex: 1,
                    height: 36,
                    borderRadius: 999,
                    backgroundColor: active ? colors.bg : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontWeight: '700',
                      color: active ? colors.text : colors.textMuted,
                      letterSpacing: 0,
                      lineHeight: 15,
                      includeFontPadding: false,
                    }}
                  >
                    {p.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Revenue hero */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 20,
              borderRadius: 22,
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
              }}
            >
              REVENUS · 30 JOURS
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: 8,
                marginTop: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '700',
                  color: colors.text,
                  fontVariant: ['tabular-nums'],
                  letterSpacing: -0.6,
                  lineHeight: 34,
                  includeFontPadding: false,
                }}
              >
                2,4M
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.textMuted,
                  fontWeight: '600',
                }}
              >
                GNF
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 3,
                  paddingHorizontal: 8,
                  height: 22,
                  borderRadius: 999,
                  backgroundColor: colors.primarySoft,
                }}
              >
                <ArrowUpRight size={11} color={colors.primaryDeep} strokeWidth={2.5} />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: colors.primaryDeep,
                    lineHeight: 13,
                    includeFontPadding: false,
                  }}
                >
                  +18 %
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 3,
                height: 70,
                alignItems: 'flex-end',
                marginTop: 20,
              }}
            >
              {VIEW_BARS.map((h, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    backgroundColor: i > 22 ? colors.primary : colors.primarySoft,
                    borderRadius: 3,
                  }}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Metric grid */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 14,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <Metric Icon={Eye} label="Vues" value="4 280" delta="+24 %" trend="up" />
          <Metric Icon={MessageCircle} label="Messages" value="86" delta="+12 %" trend="up" />
          <Metric Icon={ShoppingBag} label="Commandes" value="18" delta="+18 %" trend="up" />
          <Metric Icon={Wallet} label="Panier moyen" value="133k" delta="−3 %" trend="down" />
        </View>

        {/* Top listings */}
        <View style={{ paddingHorizontal: 24, paddingTop: 26 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: -0.2,
              marginBottom: 12,
            }}
          >
            Annonces les plus performantes
          </Text>
          <View style={{ gap: 10 }}>
            {mockProducts.slice(0, 4).map((p, idx) => (
              <View
                key={p.id}
                style={{
                  padding: 12,
                  borderRadius: 18,
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    width: 22,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: '800',
                    color: colors.textFaint,
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {idx + 1}
                </Text>
                <Image
                  source={p.photos[0]}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 10,
                    backgroundColor: colors.bgSunken,
                  }}
                  contentFit="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontWeight: '600',
                      color: colors.text,
                      letterSpacing: 0,
                      lineHeight: 17,
                      includeFontPadding: false,
                    }}
                    numberOfLines={1}
                  >
                    {p.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.textMuted,
                      marginTop: 3,
                      letterSpacing: 0,
                    }}
                  >
                    {formatGNF(p.priceGnf)} · {p.viewCount} vues
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <TrendingUp size={12} color={colors.success} strokeWidth={2.25} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '700',
                      color: colors.success,
                    }}
                  >
                    +×{(1.5 + idx * 0.4).toFixed(1)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({
  Icon,
  label,
  value,
  delta,
  trend,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
}) {
  const { colors } = useTheme();
  const trendColor = trend === 'up' ? colors.success : colors.danger;
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;
  return (
    <View
      style={{
        flexBasis: '47%',
        flexGrow: 1,
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Icon size={16} color={colors.textMuted} strokeWidth={1.75} />
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: colors.textFaint,
          letterSpacing: 0.5,
          marginTop: 10,
        }}
      >
        {label.toUpperCase()}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 8,
          marginTop: 2,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: -0.3,
            fontVariant: ['tabular-nums'],
          }}
        >
          {value}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TrendIcon size={11} color={trendColor} strokeWidth={2.5} />
          <Text
            style={{
              fontSize: 11.5,
              fontWeight: '700',
              color: trendColor,
            }}
          >
            {delta}
          </Text>
        </View>
      </View>
    </View>
  );
}
