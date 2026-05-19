import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { CircleAlert, MessageCircle, Clock } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { photos } from '../../../src/data/photos';

type DemandKind = 'price' | 'question' | 'visit';
type DemandFilter = 'all' | 'price' | 'question' | 'visit';

interface Demand {
  id: string;
  kind: DemandKind;
  clientName: string;
  clientAvatar: string;
  itemTitle: string;
  preview: string;
  ago: string;
  unread: boolean;
}

const DEMANDS: Demand[] = [
  {
    id: 'd1',
    kind: 'price',
    clientName: 'Mariama Diallo',
    clientAvatar: photos.woman1,
    itemTitle: 'Villa moderne 4 chambres — Lambanyi',
    preview: 'Je propose 3 800 000 GNF pour 6 mois de bail.',
    ago: '5 min',
    unread: true,
  },
  {
    id: 'd2',
    kind: 'visit',
    clientName: 'Ibrahima Sow',
    clientAvatar: photos.man2,
    itemTitle: 'Appartement 2 pièces — Kaloum',
    preview: 'Est-ce que vendredi 17 mai à 16h fonctionne ?',
    ago: '32 min',
    unread: true,
  },
  {
    id: 'd3',
    kind: 'question',
    clientName: 'Fatou Camara',
    clientAvatar: photos.woman2,
    itemTitle: 'Studio meublé — Dixinn',
    preview: 'Les charges sont-elles comprises dans le loyer ?',
    ago: '2 h',
    unread: false,
  },
  {
    id: 'd4',
    kind: 'question',
    clientName: 'Ousmane Touré',
    clientAvatar: photos.man1,
    itemTitle: 'Appartement 3 pièces — Ratoma',
    preview: 'Bonjour, la place de parking est-elle incluse ?',
    ago: 'Hier',
    unread: false,
  },
];

const FILTERS: { id: DemandFilter; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'price', label: 'Offres' },
  { id: 'visit', label: 'Visites' },
  { id: 'question', label: 'Questions' },
];

const KIND_META: Record<DemandKind, { label: string; bg: string; fg: string }> = {
  price: { label: 'OFFRE', bg: '#FCE7D3', fg: '#A04D08' },
  visit: { label: 'VISITE', bg: '#E0F0E8', fg: '#155F45' },
  question: { label: 'QUESTION', bg: '#E4ECF6', fg: '#2F5BBE' },
};

export default function DemandesIndex() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<DemandFilter>('all');

  const filtered = filter === 'all' ? DEMANDS : DEMANDS.filter((d) => d.kind === filter);
  const unreadCount = DEMANDS.filter((d) => d.unread).length;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Demandes"
          subtitle={`${unreadCount} demandes en attente de réponse.`}
        />

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 8,
            paddingBottom: 16,
          }}
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <Pressable
                key={f.id}
                onPress={() => {
                  haptic.selection();
                  setFilter(f.id);
                }}
                style={{
                  height: 36,
                  paddingHorizontal: 14,
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
                    letterSpacing: 0,
                    lineHeight: 15,
                    includeFontPadding: false,
                  }}
                >
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          {filtered.map((d) => (
            <DemandRow
              key={d.id}
              demand={d}
              onPress={() => router.push(`/pro/demandes/${d.id}`)}
            />
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

// ===================================================================

function DemandRow({ demand, onPress }: { demand: Demand; onPress: () => void }) {
  const { colors } = useTheme();
  const meta = KIND_META[demand.kind];

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: demand.unread ? 1.5 : 1,
        borderColor: demand.unread ? colors.primary : colors.border,
        flexDirection: 'row',
        gap: 12,
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={demand.clientAvatar}
          style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: colors.bgSunken }}
          contentFit="cover"
        />
        {demand.unread && (
          <View
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: colors.primary,
              borderWidth: 2.5,
              borderColor: colors.card,
            }}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 13.5,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: 0,
              lineHeight: 16,
              includeFontPadding: false,
            }}
            numberOfLines={1}
          >
            {demand.clientName}
          </Text>
          <View
            style={{
              paddingHorizontal: 7,
              height: 18,
              borderRadius: 999,
              backgroundColor: meta.bg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
          <Text
            style={{
              fontSize: 11,
              color: colors.textFaint,
              letterSpacing: 0,
            }}
          >
            {demand.ago}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 4,
            letterSpacing: 0,
            lineHeight: 15,
          }}
          numberOfLines={1}
        >
          {demand.itemTitle}
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: colors.text,
            marginTop: 4,
            letterSpacing: 0,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {demand.preview}
        </Text>
      </View>
    </Pressable>
  );
}
