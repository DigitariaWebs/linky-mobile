import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Megaphone, Calendar, Users } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';

interface Promo {
  id: string;
  code: string;
  discountPct: number;
  used: number;
  cap?: number;
  endsAt: string;
  status: 'active' | 'paused' | 'ended';
}

const PROMOS: Promo[] = [
  { id: 'p1', code: 'TABASKI25', discountPct: 25, used: 84, cap: 200, endsAt: '12 j', status: 'active' },
  { id: 'p2', code: 'BIENVENUE', discountPct: 10, used: 312, endsAt: '60 j', status: 'active' },
  { id: 'p3', code: 'BLACKFRI30', discountPct: 30, used: 540, cap: 540, endsAt: 'Terminée', status: 'ended' },
];

export default function PromoIndex() {
  const { colors } = useTheme();
  const active = PROMOS.filter((p) => p.status === 'active');
  const ended = PROMOS.filter((p) => p.status === 'ended');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Promos"
          subtitle="Crée des codes promo pour fidéliser tes clients."
        />

        {/* Big CTA */}
        <View style={{ paddingHorizontal: 24, marginBottom: 22 }}>
          <Pressable
            onPress={() => {
              haptic.light();
              router.push('/pro/promo/new');
            }}
            style={{
              height: 54,
              borderRadius: 16,
              backgroundColor: colors.text,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Plus size={16} color={colors.bg} strokeWidth={2.25} />
            <Text
              style={{
                fontSize: 14.5,
                fontWeight: '700',
                color: colors.bg,
                letterSpacing: 0,
                lineHeight: 17,
                includeFontPadding: false,
              }}
            >
              Créer un code promo
            </Text>
          </Pressable>
        </View>

        <Section title={`Actives · ${active.length}`}>
          {active.map((p) => (
            <PromoCard key={p.id} promo={p} onPress={() => router.push(`/pro/promo/${p.id}`)} />
          ))}
        </Section>

        {ended.length > 0 && (
          <Section title="Terminées">
            {ended.map((p) => (
              <PromoCard key={p.id} promo={p} onPress={() => router.push(`/pro/promo/${p.id}`)} />
            ))}
          </Section>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: colors.text,
          letterSpacing: -0.2,
          paddingHorizontal: 24,
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
      <View style={{ paddingHorizontal: 24, gap: 10, paddingBottom: 22 }}>{children}</View>
    </View>
  );
}

function PromoCard({ promo, onPress }: { promo: Promo; onPress: () => void }) {
  const { colors } = useTheme();
  const isEnded = promo.status === 'ended';
  const usagePct = promo.cap ? Math.min(100, Math.round((promo.used / promo.cap) * 100)) : 0;
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 20,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: isEnded ? 0.7 : 1,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: isEnded ? colors.bgSunken : colors.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Megaphone
            size={22}
            color={isEnded ? colors.textMuted : colors.primary}
            strokeWidth={1.75}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: colors.text,
                letterSpacing: 0.5,
                lineHeight: 20,
                includeFontPadding: false,
              }}
            >
              {promo.code}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: colors.accent,
                fontVariant: ['tabular-nums'],
                letterSpacing: 0,
              }}
            >
              −{promo.discountPct} %
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Users size={11} color={colors.textMuted} strokeWidth={2} />
              <Text
                style={{
                  fontSize: 11.5,
                  color: colors.textMuted,
                  fontVariant: ['tabular-nums'],
                }}
              >
                {promo.used}
                {promo.cap ? ` / ${promo.cap}` : ''}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Calendar size={11} color={colors.textMuted} strokeWidth={2} />
              <Text style={{ fontSize: 11.5, color: colors.textMuted, letterSpacing: 0 }}>
                {promo.endsAt}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {promo.cap && (
        <View
          style={{
            marginTop: 12,
            height: 6,
            borderRadius: 999,
            backgroundColor: colors.bgSunken,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${usagePct}%`,
              backgroundColor: isEnded ? colors.textMuted : colors.primary,
            }}
          />
        </View>
      )}
    </Pressable>
  );
}
