import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  X,
  CircleAlert,
  ArrowDownToLine,
  MessageCircle,
  Building2,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { ScreenHeader } from '../../src/components/nav/ScreenHeader';
import { haptic } from '../../src/lib/haptics';
import { mockProperties } from '../../src/data/mockProperties';
import { formatGNF } from '../../src/lib/format';

type RequestKind = 'visit' | 'offer';
type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'counter';

interface BuyerRequest {
  id: string;
  kind: RequestKind;
  status: RequestStatus;
  propertyId: string;
  detail: string;
  ago: string;
  counterAmount?: number;
}

const MOCK_REQUESTS: BuyerRequest[] = [
  {
    id: 'r1',
    kind: 'visit',
    status: 'accepted',
    propertyId: mockProperties[0]!.id,
    detail: 'Demain · 14:00',
    ago: '2 min',
  },
  {
    id: 'r2',
    kind: 'offer',
    status: 'counter',
    propertyId: mockProperties[1]!.id,
    detail: '3 800 000 GNF / 12 mois',
    ago: '1 h',
    counterAmount: 3950000,
  },
  {
    id: 'r3',
    kind: 'visit',
    status: 'pending',
    propertyId: mockProperties[2]!.id,
    detail: 'Vendredi · 17:00',
    ago: '3 h',
  },
  {
    id: 'r4',
    kind: 'offer',
    status: 'rejected',
    propertyId: mockProperties[3]!.id,
    detail: '2 500 000 GNF / 6 mois',
    ago: 'Hier',
  },
];

const STATUS_META: Record<
  RequestStatus,
  { label: string; Icon: LucideIcon; bg: string; fg: string }
> = {
  pending: { label: 'EN ATTENTE', Icon: Clock, bg: '#FCF1DC', fg: '#8B5A0A' },
  accepted: { label: 'ACCEPTÉ', Icon: CheckCircle2, bg: '#E0F0E8', fg: '#155F45' },
  rejected: { label: 'REFUSÉ', Icon: X, bg: '#FBE7E5', fg: '#B53D2F' },
  counter: { label: 'CONTRE-OFFRE', Icon: ArrowDownToLine, bg: '#FCE7D3', fg: '#A04D08' },
};

type Filter = 'all' | 'visits' | 'offers';

export default function BuyerRequestsRoute() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = MOCK_REQUESTS.filter((r) => {
    if (filter === 'visits') return r.kind === 'visit';
    if (filter === 'offers') return r.kind === 'offer';
    return true;
  });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Mes demandes"
          subtitle="Tes visites et offres en cours."
        />

        {/* Filter chips */}
        <View
          style={{
            paddingHorizontal: 24,
            marginBottom: 14,
            flexDirection: 'row',
            gap: 8,
          }}
        >
          {(['all', 'visits', 'offers'] as Filter[]).map((f) => {
            const label = f === 'all' ? 'Tout' : f === 'visits' ? 'Visites' : 'Offres';
            const active = filter === f;
            return (
              <Pressable
                key={f}
                onPress={() => {
                  haptic.selection();
                  setFilter(f);
                }}
                style={{
                  paddingHorizontal: 14,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: active ? colors.text : colors.card,
                  borderWidth: 1,
                  borderColor: active ? colors.text : colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: active ? colors.bg : colors.text,
                    lineHeight: 15,
                    includeFontPadding: false,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          {filtered.map((r) => (
            <RequestRow key={r.id} request={r} />
          ))}
          {filtered.length === 0 && (
            <View style={{ paddingVertical: 40, alignItems: 'center' }}>
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>Aucune demande.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RequestRow({ request }: { request: BuyerRequest }) {
  const { colors } = useTheme();
  const meta = STATUS_META[request.status];
  const property = mockProperties.find((p) => p.id === request.propertyId);
  const KindIcon = request.kind === 'visit' ? CalendarDays : Building2;

  return (
    <Pressable
      onPress={() => router.push(`/property/${request.propertyId}`)}
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
        {property && (
          <Image
            source={property.photos[0]}
            style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bgSunken }}
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
            <Text style={{ fontSize: 11, color: colors.textFaint }}>{request.ago}</Text>
          </View>
          {property && (
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
              {property.title}
            </Text>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 }}>
            <KindIcon size={11} color={colors.textMuted} strokeWidth={2} />
            <Text style={{ fontSize: 12, color: colors.textMuted, letterSpacing: 0 }}>
              {request.detail}
            </Text>
          </View>
          {request.status === 'counter' && request.counterAmount && (
            <View
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 12,
                backgroundColor: colors.accentSoft,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: '700', color: colors.accentText }}>
                L'agent propose
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: colors.accentText,
                  fontVariant: ['tabular-nums'],
                }}
              >
                {formatGNF(request.counterAmount)}
              </Text>
            </View>
          )}
          {(request.status === 'accepted' || request.status === 'counter') && (
            <View style={{ marginTop: 10, flexDirection: 'row', gap: 8 }}>
              <Pressable
                style={{
                  flex: 1,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: colors.text,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 6,
                }}
              >
                <MessageCircle size={13} color={colors.bg} strokeWidth={2} />
                <Text
                  style={{
                    fontSize: 12.5,
                    fontWeight: '700',
                    color: colors.bg,
                    lineHeight: 15,
                    includeFontPadding: false,
                  }}
                >
                  Message
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
