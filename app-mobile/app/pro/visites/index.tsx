import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { CalendarDays, Clock, MapPin, Phone } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProperties } from '../../../src/data/mockProperties';
import { photos } from '../../../src/data/photos';

interface Visit {
  id: string;
  day: string;
  date: string;
  time: string;
  clientName: string;
  clientAvatar: string;
  propertyId: string;
  status: 'confirmed' | 'pending';
}

const VISITS: Visit[] = [
  {
    id: 'v1',
    day: 'Aujourd\'hui',
    date: '15 mai',
    time: '14:30',
    clientName: 'Mariama Diallo',
    clientAvatar: photos.woman1,
    propertyId: mockProperties[0]!.id,
    status: 'confirmed',
  },
  {
    id: 'v2',
    day: 'Aujourd\'hui',
    date: '15 mai',
    time: '17:00',
    clientName: 'Ibrahima Sow',
    clientAvatar: photos.man2,
    propertyId: mockProperties[1]!.id,
    status: 'confirmed',
  },
  {
    id: 'v3',
    day: 'Demain',
    date: '16 mai',
    time: '10:00',
    clientName: 'Fatou Camara',
    clientAvatar: photos.woman2,
    propertyId: mockProperties[2]!.id,
    status: 'pending',
  },
  {
    id: 'v4',
    day: 'Jeudi',
    date: '17 mai',
    time: '11:30',
    clientName: 'Ousmane Touré',
    clientAvatar: photos.man1,
    propertyId: mockProperties[3]!.id,
    status: 'confirmed',
  },
];

export default function VisitesIndex() {
  const { colors } = useTheme();
  const grouped = VISITS.reduce<Record<string, Visit[]>>((acc, v) => {
    (acc[v.day] ||= []).push(v);
    return acc;
  }, {});

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Visites"
          subtitle="Tes rendez-vous de visite à venir."
        />

        {/* Mini summary */}
        <View
          style={{ paddingHorizontal: 24, flexDirection: 'row', gap: 10, marginBottom: 22 }}
        >
          <SummaryStat label="Aujourd'hui" value="2" tone="accent" />
          <SummaryStat label="Cette semaine" value="4" />
          <SummaryStat label="En attente" value="1" />
        </View>

        {Object.entries(grouped).map(([day, items]) => (
          <View key={day} style={{ marginBottom: 22 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: 8,
                paddingHorizontal: 24,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.text,
                  letterSpacing: -0.2,
                }}
              >
                {day}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.textMuted,
                  letterSpacing: 0,
                }}
              >
                · {items[0]?.date}
              </Text>
            </View>
            <View style={{ paddingHorizontal: 24, gap: 10 }}>
              {items.map((v) => (
                <VisitCard
                  key={v.id}
                  visit={v}
                  onPress={() => {
                    haptic.light();
                    router.push(`/pro/visites/${v.id}`);
                  }}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================================

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'accent';
}) {
  const { colors } = useTheme();
  const accent = tone === 'accent';
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        borderRadius: 16,
        backgroundColor: accent ? colors.accentSoft : colors.card,
        borderWidth: 1,
        borderColor: accent ? 'transparent' : colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 10.5,
          fontWeight: '700',
          color: accent ? colors.accentText : colors.textFaint,
          letterSpacing: 0.5,
        }}
      >
        {label.toUpperCase()}
      </Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: '700',
          color: accent ? colors.accentText : colors.text,
          marginTop: 4,
          fontVariant: ['tabular-nums'],
          letterSpacing: -0.3,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

function VisitCard({ visit, onPress }: { visit: Visit; onPress: () => void }) {
  const { colors } = useTheme();
  const property = mockProperties.find((p) => p.id === visit.propertyId);
  const pending = visit.status === 'pending';

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        gap: 12,
      }}
    >
      {/* Time column */}
      <View
        style={{
          width: 56,
          paddingTop: 4,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            fontVariant: ['tabular-nums'],
            letterSpacing: -0.2,
            lineHeight: 22,
            includeFontPadding: false,
          }}
        >
          {visit.time}
        </Text>
        <View
          style={{
            marginTop: 6,
            paddingHorizontal: 6,
            height: 18,
            borderRadius: 999,
            backgroundColor: pending ? colors.accentSoft : colors.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 9,
              fontWeight: '700',
              color: pending ? colors.accentText : colors.primaryDeep,
              lineHeight: 11,
              includeFontPadding: false,
              letterSpacing: 0.3,
            }}
          >
            {pending ? 'EN ATTENTE' : 'CONFIRMÉ'}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Image
            source={visit.clientAvatar}
            style={{ width: 26, height: 26, borderRadius: 999, backgroundColor: colors.bgSunken }}
            contentFit="cover"
          />
          <Text
            style={{
              fontSize: 13.5,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: 0,
              lineHeight: 16,
              includeFontPadding: false,
            }}
          >
            {visit.clientName}
          </Text>
        </View>
        {property && (
          <Text
            style={{
              fontSize: 13,
              color: colors.text,
              marginTop: 8,
              letterSpacing: 0,
              lineHeight: 17,
            }}
            numberOfLines={1}
          >
            {property.title}
          </Text>
        )}
        {property && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              marginTop: 4,
            }}
          >
            <MapPin size={11} color={colors.textMuted} strokeWidth={2} />
            <Text
              style={{
                fontSize: 11.5,
                color: colors.textMuted,
                letterSpacing: 0,
              }}
              numberOfLines={1}
            >
              {property.district}, {property.city}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
