import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Plus, Zap, TrendingUp, Clock, Eye } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProducts } from '../../../src/data/mockProducts';
import { formatGNF } from '../../../src/lib/format';

interface ActiveBoost {
  id: string;
  title: string;
  cover: string;
  endsIn: string;
  views: number;
  multiplier: string;
}

const ACTIVE: ActiveBoost[] = [
  {
    id: 'b1',
    title: mockProducts[0]?.title ?? 'Annonce',
    cover: mockProducts[0]?.photos[0] ?? '',
    endsIn: '3 j',
    views: 1240,
    multiplier: '×3,2',
  },
  {
    id: 'b2',
    title: mockProducts[1]?.title ?? 'Annonce',
    cover: mockProducts[1]?.photos[0] ?? '',
    endsIn: '6 h',
    views: 580,
    multiplier: '×2,1',
  },
];

export default function BoostIndex() {
  const { colors } = useTheme();
  const candidates = mockProducts.slice(2, 7);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Booster"
          subtitle="Mets en avant tes annonces et touche plus d'acheteurs."
        />

        {/* Quick fact */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 16,
              borderRadius: 20,
              backgroundColor: colors.primarySoft,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={18} color="#FFFFFF" strokeWidth={2.25} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: colors.primaryDeep,
                  letterSpacing: 0,
                  lineHeight: 17,
                  includeFontPadding: false,
                }}
              >
                ×3 de vues en moyenne
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.primaryDeep,
                  marginTop: 2,
                  opacity: 0.75,
                  letterSpacing: 0,
                }}
              >
                Sur 7 jours, à partir de 25 000 GNF.
              </Text>
            </View>
          </View>
        </View>

        {/* Active boosts */}
        <Section title="Boosts en cours" badge={`${ACTIVE.length}`}>
          {ACTIVE.map((b) => (
            <BoostRow
              key={b.id}
              title={b.title}
              cover={b.cover}
              endsIn={b.endsIn}
              views={b.views}
              multiplier={b.multiplier}
              onPress={() => router.push(`/pro/boost/${b.id}`)}
            />
          ))}
        </Section>

        {/* Candidates */}
        <Section title="Tes annonces à booster">
          {candidates.map((p) => (
            <CandidateRow
              key={p.id}
              title={p.title}
              price={formatGNF(p.priceGnf)}
              cover={p.photos[0]}
              views={p.viewCount}
              onPress={() => router.push(`/pro/boost/new?productId=${p.id}`)}
            />
          ))}
        </Section>

        {/* Big CTA */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16 }}>
          <Pressable
            onPress={() => {
              haptic.light();
              router.push('/pro/boost/new');
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
              Démarrer un boost
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================================

function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ paddingTop: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 8,
          paddingHorizontal: 24,
          marginBottom: 12,
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
          {title}
        </Text>
        {badge && (
          <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              color: colors.textFaint,
              fontVariant: ['tabular-nums'],
            }}
          >
            · {badge}
          </Text>
        )}
      </View>
      <View style={{ paddingHorizontal: 24, gap: 10 }}>{children}</View>
    </View>
  );
}

function BoostRow({
  title,
  cover,
  endsIn,
  views,
  multiplier,
  onPress,
}: {
  title: string;
  cover: string;
  endsIn: string;
  views: number;
  multiplier: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 12,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: 1.5,
        borderColor: colors.accent,
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={cover}
          style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: colors.bgSunken }}
          contentFit="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            width: 24,
            height: 24,
            borderRadius: 999,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.card,
          }}
        >
          <Zap size={11} color="#FFFFFF" strokeWidth={2.5} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            letterSpacing: 0,
            lineHeight: 18,
            includeFontPadding: false,
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Clock size={11} color={colors.accentText} strokeWidth={2.25} />
            <Text
              style={{
                fontSize: 11.5,
                fontWeight: '700',
                color: colors.accentText,
                letterSpacing: 0,
              }}
            >
              {endsIn} restants
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Eye size={11} color={colors.textMuted} strokeWidth={2} />
            <Text
              style={{
                fontSize: 11.5,
                color: colors.textMuted,
                fontVariant: ['tabular-nums'],
              }}
            >
              {views}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <TrendingUp size={11} color={colors.success} strokeWidth={2.25} />
            <Text
              style={{
                fontSize: 11.5,
                fontWeight: '700',
                color: colors.success,
              }}
            >
              {multiplier}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function CandidateRow({
  title,
  price,
  cover,
  views,
  onPress,
}: {
  title: string;
  price: string;
  cover: string;
  views: number;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
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
        source={cover}
        style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bgSunken }}
        contentFit="cover"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: colors.text,
            letterSpacing: 0,
            lineHeight: 18,
            includeFontPadding: false,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: colors.text,
              fontVariant: ['tabular-nums'],
            }}
          >
            {price}
          </Text>
          <Text
            style={{
              fontSize: 11.5,
              color: colors.textMuted,
              fontVariant: ['tabular-nums'],
            }}
          >
            · {views} vues
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 12,
          height: 32,
          borderRadius: 999,
          backgroundColor: colors.primarySoft,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Zap size={12} color={colors.primary} strokeWidth={2.25} />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: colors.primaryDeep,
            lineHeight: 14,
            includeFontPadding: false,
          }}
        >
          Booster
        </Text>
      </View>
    </Pressable>
  );
}
