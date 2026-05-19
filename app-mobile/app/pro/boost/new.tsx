import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Zap, TrendingUp, Eye, Check, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProducts, getProduct } from '../../../src/data/mockProducts';
import { formatGNF } from '../../../src/lib/format';

interface Plan {
  id: '24h' | '3j' | '7j' | '14j';
  label: string;
  duration: string;
  priceGnf: number;
  reach: string;
  best?: boolean;
}

const PLANS: Plan[] = [
  { id: '24h', label: '24 heures', duration: '1 jour', priceGnf: 8000, reach: '+150 vues estimées' },
  { id: '3j', label: '3 jours', duration: '3 jours', priceGnf: 18000, reach: '+450 vues estimées' },
  {
    id: '7j',
    label: '7 jours',
    duration: '1 semaine',
    priceGnf: 25000,
    reach: '+1 200 vues estimées',
    best: true,
  },
  { id: '14j', label: '14 jours', duration: '2 semaines', priceGnf: 42000, reach: '+2 800 vues estimées' },
];

export default function BoostNewRoute() {
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ productId?: string }>();
  const product = params.productId ? getProduct(params.productId) : mockProducts[0];

  const [planId, setPlanId] = useState<Plan['id']>('7j');
  const plan = PLANS.find((p) => p.id === planId)!;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Démarrer un boost" subtitle="Choisis la durée et la cible." />

        {/* Selected product */}
        {product && (
          <View style={{ paddingHorizontal: 24, marginBottom: 22 }}>
            <Pressable
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
              <Image
                source={product.photos[0]}
                style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bgSunken }}
                contentFit="cover"
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: colors.textFaint,
                    letterSpacing: 0.4,
                  }}
                >
                  À BOOSTER
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors.text,
                    marginTop: 2,
                    letterSpacing: 0,
                    lineHeight: 18,
                    includeFontPadding: false,
                  }}
                  numberOfLines={1}
                >
                  {product.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12.5,
                    fontWeight: '700',
                    color: colors.text,
                    marginTop: 2,
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {formatGNF(product.priceGnf)}
                </Text>
              </View>
              <ChevronRight size={16} color={colors.textFaint} strokeWidth={2} />
            </Pressable>
          </View>
        )}

        {/* Plans */}
        <View style={{ paddingHorizontal: 24, marginBottom: 14 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: colors.textFaint,
              letterSpacing: 0.6,
              marginBottom: 10,
            }}
          >
            DURÉE
          </Text>
          <View style={{ gap: 10 }}>
            {PLANS.map((p) => (
              <PlanRow
                key={p.id}
                plan={p}
                selected={planId === p.id}
                onPress={() => {
                  haptic.selection();
                  setPlanId(p.id);
                }}
              />
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={{ paddingHorizontal: 24, marginBottom: 18 }}>
          <View
            style={{
              padding: 16,
              borderRadius: 18,
              backgroundColor: colors.bgSunken,
              gap: 8,
            }}
          >
            <SummaryRow label="Annonce boostée" value="1 article" />
            <SummaryRow label="Durée" value={plan.duration} />
            <SummaryRow label="Audience estimée" value={plan.reach} accent />
            <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 4 }} />
            <SummaryRow label="Total" value={formatGNF(plan.priceGnf)} bold />
          </View>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: 24 }}>
          <Pressable
            onPress={() => {
              haptic.medium();
              router.replace('/pro/boost');
            }}
            style={{
              height: 56,
              borderRadius: 16,
              backgroundColor: colors.text,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Zap size={16} color={colors.bg} strokeWidth={2.25} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: colors.bg,
                letterSpacing: 0,
                lineHeight: 18,
                includeFontPadding: false,
              }}
            >
              Booster pour {formatGNF(plan.priceGnf)}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================================

function PlanRow({
  plan,
  selected,
  onPress,
}: {
  plan: Plan;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 18,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primarySoft : colors.card,
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: selected ? colors.bg : colors.bgSunken,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Zap size={18} color={selected ? colors.primary : colors.text} strokeWidth={1.75} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: 0,
              lineHeight: 18,
              includeFontPadding: false,
            }}
          >
            {plan.label}
          </Text>
          {plan.best && (
            <View
              style={{
                paddingHorizontal: 8,
                height: 20,
                borderRadius: 999,
                backgroundColor: colors.accentSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 9.5,
                  fontWeight: '700',
                  color: colors.accentText,
                  lineHeight: 11,
                  includeFontPadding: false,
                  letterSpacing: 0.3,
                }}
              >
                MEILLEUR CHOIX
              </Text>
            </View>
          )}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
          <TrendingUp size={11} color={colors.textMuted} strokeWidth={2} />
          <Text style={{ fontSize: 11.5, color: colors.textMuted, letterSpacing: 0 }}>
            {plan.reach}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: colors.text,
            fontVariant: ['tabular-nums'],
            letterSpacing: -0.2,
          }}
        >
          {formatGNF(plan.priceGnf)}
        </Text>
      </View>
    </Pressable>
  );
}

function SummaryRow({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text
        style={{
          fontSize: 13,
          color: colors.textMuted,
          letterSpacing: 0,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: bold ? 15 : 13,
          fontWeight: bold ? '700' : '600',
          color: accent ? colors.primaryDeep : colors.text,
          fontVariant: ['tabular-nums'],
          letterSpacing: 0,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
