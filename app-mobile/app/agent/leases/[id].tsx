import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import {
  KeyRound,
  CalendarDays,
  Phone,
  MessageCircle,
  FileText,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProperties } from '../../../src/data/mockProperties';
import { photos } from '../../../src/data/photos';
import { formatGNF } from '../../../src/lib/format';

interface Payment {
  id: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'late';
}

const PAYMENTS: Payment[] = [
  { id: 'p1', month: 'Mai 2026', amount: 1_500_000, status: 'pending' },
  { id: 'p2', month: 'Avril 2026', amount: 1_500_000, status: 'paid' },
  { id: 'p3', month: 'Mars 2026', amount: 1_500_000, status: 'paid' },
  { id: 'p4', month: 'Février 2026', amount: 1_500_000, status: 'paid' },
];

export default function LeaseDetailRoute() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = mockProperties[0]!;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Bail en cours" />

        {/* Property */}
        <View style={{ paddingHorizontal: 24 }}>
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
            <Image
              source={property.photos[0]}
              style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: colors.bgSunken }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.text,
                  letterSpacing: 0,
                  lineHeight: 18,
                  includeFontPadding: false,
                }}
                numberOfLines={2}
              >
                {property.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: colors.text,
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {formatGNF(property.priceGnf)}
                </Text>
                <Text style={{ fontSize: 11, color: colors.textMuted }}>/mois</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tenant */}
        <Section title="Locataire">
          <View
            style={{
              padding: 14,
              borderRadius: 18,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              gap: 14,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image
                source={photos.woman1}
                style={{ width: 48, height: 48, borderRadius: 999, backgroundColor: colors.bgSunken }}
                contentFit="cover"
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: colors.text,
                    lineHeight: 18,
                    includeFontPadding: false,
                  }}
                >
                  Mariama Diallo
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.textMuted,
                    marginTop: 2,
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  +224 622 55 12 88
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                onPress={() => haptic.light()}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: colors.bgSunken,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Phone size={14} color={colors.text} strokeWidth={2} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>Appeler</Text>
              </Pressable>
              <Pressable
                onPress={() => haptic.light()}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: colors.bgSunken,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <MessageCircle size={14} color={colors.text} strokeWidth={2} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>Message</Text>
              </Pressable>
            </View>
          </View>
        </Section>

        {/* Contract */}
        <Section title="Contrat">
          <View
            style={{
              padding: 14,
              borderRadius: 18,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              gap: 12,
            }}
          >
            <DataRow Icon={CalendarDays} label="Début" value="01/01/2026" />
            <DataRow Icon={CalendarDays} label="Fin" value="31/12/2026" />
            <DataRow Icon={KeyRound} label="Dépôt de garantie" value={formatGNF(3_000_000)} />
            <Pressable
              onPress={() => haptic.light()}
              style={{
                marginTop: 4,
                height: 42,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.borderStrong,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <FileText size={14} color={colors.text} strokeWidth={2} />
              <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>
                Voir le contrat
              </Text>
            </Pressable>
          </View>
        </Section>

        {/* Payment history */}
        <Section title="Loyers">
          <View
            style={{
              borderRadius: 18,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden',
            }}
          >
            {PAYMENTS.map((p, idx) => (
              <PaymentRow key={p.id} payment={p} last={idx === PAYMENTS.length - 1} />
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: '700',
          color: colors.textFaint,
          letterSpacing: 0.6,
          marginBottom: 10,
          marginLeft: 4,
        }}
      >
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

function DataRow({
  Icon,
  label,
  value,
}: {
  Icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <Icon size={14} color={colors.textMuted} strokeWidth={1.75} />
      <Text style={{ flex: 1, fontSize: 13, color: colors.textMuted }}>{label}</Text>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '700',
          color: colors.text,
          fontVariant: ['tabular-nums'],
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function PaymentRow({ payment, last }: { payment: Payment; last?: boolean }) {
  const { colors } = useTheme();
  const Icon = payment.status === 'paid' ? CheckCircle2 : payment.status === 'pending' ? Clock : AlertTriangle;
  const tint =
    payment.status === 'paid'
      ? colors.primary
      : payment.status === 'pending'
        ? colors.accent
        : colors.danger;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: colors.bgSunken,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Wallet size={14} color={colors.text} strokeWidth={1.75} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13.5, fontWeight: '600', color: colors.text, letterSpacing: 0 }}>
          {payment.month}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontWeight: '700',
            color: colors.text,
            fontVariant: ['tabular-nums'],
            marginTop: 2,
          }}
        >
          {formatGNF(payment.amount)}
        </Text>
      </View>
      <Icon size={18} color={tint} strokeWidth={2} />
    </View>
  );
}
