import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { CircleAlert, ChevronRight, Clock, CheckCircle2 } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { mockOrders } from '../../../src/data/mockOrders';
import { formatGNF } from '../../../src/lib/format';

interface RefundCase {
  id: string;
  orderId: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
  ago: string;
}

const REFUNDS: RefundCase[] = [
  {
    id: 'rf1',
    orderId: mockOrders[0]!.id,
    reason: 'Article différent de la photo',
    status: 'pending',
    ago: '2 h',
  },
  {
    id: 'rf2',
    orderId: mockOrders[0]!.id,
    reason: 'Produit endommagé',
    status: 'accepted',
    ago: 'Hier',
  },
];

const META: Record<
  RefundCase['status'],
  { label: string; Icon: LucideIcon; bg: string; fg: string }
> = {
  pending: { label: 'À TRAITER', Icon: Clock, bg: '#FCE7D3', fg: '#A04D08' },
  accepted: { label: 'REMBOURSÉ', Icon: CheckCircle2, bg: '#E0F0E8', fg: '#155F45' },
  rejected: { label: 'REFUSÉ', Icon: CircleAlert, bg: '#FBE7E5', fg: '#B53D2F' },
};

export default function RefundsRoute() {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Litiges & remboursements"
          subtitle="Les acheteurs qui demandent un remboursement."
        />

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          {REFUNDS.map((r) => {
            const order = mockOrders.find((o) => o.id === r.orderId);
            const meta = META[r.status];
            return (
              <Pressable
                key={r.id}
                onPress={() => router.push(`/seller/refunds/${r.id}`)}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  backgroundColor: colors.card,
                  borderWidth: r.status === 'pending' ? 1.5 : 1,
                  borderColor: r.status === 'pending' ? colors.accent : colors.border,
                  flexDirection: 'row',
                  gap: 12,
                }}
              >
                {order && (
                  <Image
                    source={order.productSnapshot.photo}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      backgroundColor: colors.bgSunken,
                    }}
                    contentFit="cover"
                  />
                )}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        height: 20,
                        borderRadius: 999,
                        backgroundColor: meta.bg,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: 4,
                      }}
                    >
                      <meta.Icon size={10} color={meta.fg} strokeWidth={2.5} />
                      <Text
                        style={{
                          fontSize: 9.5,
                          fontWeight: '700',
                          color: meta.fg,
                          lineHeight: 11,
                          includeFontPadding: false,
                          letterSpacing: 0.3,
                        }}
                      >
                        {meta.label}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 11, color: colors.textFaint }}>{r.ago}</Text>
                  </View>
                  {order && (
                    <Text
                      style={{
                        fontSize: 13.5,
                        fontWeight: '600',
                        color: colors.text,
                        marginTop: 6,
                        letterSpacing: 0,
                        lineHeight: 17,
                        includeFontPadding: false,
                      }}
                      numberOfLines={1}
                    >
                      {order.productSnapshot.title}
                    </Text>
                  )}
                  <Text
                    style={{
                      fontSize: 12.5,
                      color: colors.textMuted,
                      marginTop: 4,
                      letterSpacing: 0,
                      lineHeight: 16,
                    }}
                  >
                    {r.reason}
                  </Text>
                  {order && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: colors.text,
                        marginTop: 6,
                        fontVariant: ['tabular-nums'],
                      }}
                    >
                      {formatGNF(order.totalGnf)}
                    </Text>
                  )}
                </View>
                <ChevronRight size={16} color={colors.textFaint} strokeWidth={2} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
