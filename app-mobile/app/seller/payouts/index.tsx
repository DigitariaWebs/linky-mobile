import { ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Wallet,
  ArrowDownToLine,
  Clock,
  CheckCircle2,
  Calendar,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { NoiseOverlay } from '../../../src/components/visuals/NoiseOverlay';
import { haptic } from '../../../src/lib/haptics';
import { formatGNF } from '../../../src/lib/format';

interface Payout {
  id: string;
  amountGnf: number;
  status: 'pending' | 'paid';
  method: string;
  date: string;
  orders: number;
}

const PAYOUTS: Payout[] = [
  { id: 'p1', amountGnf: 432_600, status: 'pending', method: 'Orange Money', date: 'Dans 2 j', orders: 1 },
  { id: 'p2', amountGnf: 1_842_000, status: 'paid', method: 'Orange Money', date: '12 mai', orders: 6 },
  { id: 'p3', amountGnf: 985_000, status: 'paid', method: 'MTN Money', date: '8 mai', orders: 3 },
  { id: 'p4', amountGnf: 2_410_500, status: 'paid', method: 'Orange Money', date: '2 mai', orders: 9 },
];

export default function PayoutsRoute() {
  const { colors } = useTheme();
  const pending = PAYOUTS.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amountGnf, 0);
  const lifetime = PAYOUTS.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amountGnf, 0);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Versements" subtitle="L'argent libéré arrive sur ton Mobile Money." />

        {/* Hero */}
        <View style={{ paddingHorizontal: 24 }}>
          <View style={{ borderRadius: 22, overflow: 'hidden', backgroundColor: '#0A5240' }}>
            <LinearGradient
              colors={['#118866', '#0A5240', '#063929']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <LinearGradient
              colors={['rgba(232,165,61,0.35)', 'rgba(232,165,61,0)']}
              start={{ x: 1, y: 0 }}
              end={{ x: 0.3, y: 0.6 }}
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: 999,
              }}
            />
            <NoiseOverlay />
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: 'rgba(255,255,255,0.65)',
                  letterSpacing: 0.5,
                }}
              >
                EN ATTENTE
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    fontVariant: ['tabular-nums'],
                    letterSpacing: -0.6,
                    lineHeight: 38,
                    includeFontPadding: false,
                  }}
                >
                  {formatGNF(pending).replace(' GNF', '')}
                </Text>
                <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
                  GNF
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12.5,
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 4,
                  letterSpacing: 0,
                }}
              >
                Total reçu cette année · {formatGNF(lifetime)}
              </Text>
            </View>
          </View>
        </View>

        {/* List */}
        <View style={{ paddingHorizontal: 24, paddingTop: 22, gap: 10 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: colors.textFaint,
              letterSpacing: 0.6,
              marginLeft: 4,
              marginBottom: 4,
            }}
          >
            HISTORIQUE
          </Text>
          {PAYOUTS.map((p) => (
            <PayoutRow key={p.id} payout={p} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PayoutRow({ payout }: { payout: Payout }) {
  const { colors } = useTheme();
  const pending = payout.status === 'pending';
  const StatusIcon: LucideIcon = pending ? Clock : CheckCircle2;
  return (
    <View
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: pending ? colors.accentSoft : colors.primarySoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StatusIcon
          size={18}
          color={pending ? colors.accentText : colors.primary}
          strokeWidth={2}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: colors.text,
            fontVariant: ['tabular-nums'],
            letterSpacing: 0,
            lineHeight: 18,
            includeFontPadding: false,
          }}
        >
          {formatGNF(payout.amountGnf)}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 2,
            letterSpacing: 0,
          }}
        >
          {payout.method} · {payout.orders} commande{payout.orders > 1 ? 's' : ''}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: pending ? colors.accentText : colors.textMuted,
          letterSpacing: 0,
        }}
      >
        {payout.date}
      </Text>
    </View>
  );
}
