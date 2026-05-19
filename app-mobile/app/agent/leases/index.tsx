import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { KeyRound, Calendar, ChevronRight, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { mockProperties } from '../../../src/data/mockProperties';
import { photos } from '../../../src/data/photos';
import { formatGNF } from '../../../src/lib/format';

interface Lease {
  id: string;
  propertyId: string;
  tenantName: string;
  tenantAvatar: string;
  rentGnf: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'overdue' | 'ending';
  nextDue: string;
}

const LEASES: Lease[] = [
  {
    id: 'l1',
    propertyId: mockProperties[0]!.id,
    tenantName: 'Mariama Diallo',
    tenantAvatar: photos.woman1,
    rentGnf: 1_500_000,
    startDate: '01/01/2026',
    endDate: '31/12/2026',
    status: 'active',
    nextDue: 'Dans 12 j',
  },
  {
    id: 'l2',
    propertyId: mockProperties[1]!.id,
    tenantName: 'Ibrahima Sow',
    tenantAvatar: photos.man2,
    rentGnf: 4_200_000,
    startDate: '15/03/2026',
    endDate: '14/03/2027',
    status: 'overdue',
    nextDue: 'Retard 5 j',
  },
  {
    id: 'l3',
    propertyId: mockProperties[2]!.id,
    tenantName: 'Fatou Camara',
    tenantAvatar: photos.woman2,
    rentGnf: 850_000,
    startDate: '01/06/2025',
    endDate: '31/05/2026',
    status: 'ending',
    nextDue: 'Fin dans 14 j',
  },
];

export default function LeasesIndex() {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Locations actives" subtitle="Tes baux en cours et leurs paiements." />

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          {LEASES.map((l) => (
            <LeaseRow key={l.id} lease={l} onPress={() => router.push(`/agent/leases/${l.id}`)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LeaseRow({ lease, onPress }: { lease: Lease; onPress: () => void }) {
  const { colors } = useTheme();
  const property = mockProperties.find((p) => p.id === lease.propertyId);
  const isOverdue = lease.status === 'overdue';
  const isEnding = lease.status === 'ending';
  const accent = isOverdue ? colors.danger : isEnding ? colors.accent : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: isOverdue ? 1.5 : 1,
        borderColor: isOverdue ? colors.danger : colors.border,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 12 }}>
        {property && (
          <Image
            source={property.photos[0]}
            style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: colors.bgSunken }}
            contentFit="cover"
          />
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 13.5,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: 0,
              lineHeight: 17,
              includeFontPadding: false,
            }}
            numberOfLines={1}
          >
            {property?.title ?? 'Bien'}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
            <Image
              source={lease.tenantAvatar}
              style={{ width: 18, height: 18, borderRadius: 999 }}
              contentFit="cover"
            />
            <Text style={{ fontSize: 12, color: colors.textMuted, letterSpacing: 0 }}>
              {lease.tenantName}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.text,
                fontVariant: ['tabular-nums'],
              }}
            >
              {formatGNF(lease.rentGnf)}
            </Text>
            <Text style={{ fontSize: 11, color: colors.textMuted }}>/mois</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 6,
              paddingHorizontal: 8,
              alignSelf: 'flex-start',
              height: 22,
              borderRadius: 999,
              backgroundColor:
                isOverdue
                  ? 'rgba(209,79,60,0.12)'
                  : isEnding
                    ? colors.accentSoft
                    : colors.primarySoft,
            }}
          >
            {isOverdue ? (
              <AlertTriangle size={11} color={colors.danger} strokeWidth={2.25} />
            ) : (
              <Calendar size={11} color={accent} strokeWidth={2.25} />
            )}
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: accent,
                letterSpacing: 0.3,
                lineHeight: 13,
                includeFontPadding: false,
              }}
            >
              {lease.nextDue.toUpperCase()}
            </Text>
          </View>
        </View>
        <ChevronRight size={16} color={colors.textFaint} strokeWidth={2} />
      </View>
    </Pressable>
  );
}
