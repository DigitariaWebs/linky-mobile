import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Megaphone, Copy, Pause, X, Users, Calendar, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';

export default function PromoDetailRoute() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const promo = {
    code: 'TABASKI25',
    pct: 25,
    used: 84,
    cap: 200,
    revenue: '3,2M GNF',
    avg: '+ 38 %',
    endsAt: 'Dans 12 jours',
  };
  const usagePct = Math.round((promo.used / promo.cap) * 100);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Promo" />

        {/* Code card */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 22,
              borderRadius: 22,
              backgroundColor: colors.primarySoft,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Megaphone size={22} color="#FFFFFF" strokeWidth={2} />
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '800',
                color: colors.primaryDeep,
                marginTop: 14,
                letterSpacing: 1.5,
                lineHeight: 32,
                includeFontPadding: false,
              }}
            >
              {promo.code}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.accent,
                marginTop: 4,
                letterSpacing: 0,
                fontVariant: ['tabular-nums'],
              }}
            >
              −{promo.pct} % de réduction
            </Text>
            <Pressable
              onPress={() => haptic.light()}
              style={{
                marginTop: 16,
                height: 36,
                paddingHorizontal: 14,
                borderRadius: 999,
                backgroundColor: colors.bg,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Copy size={13} color={colors.text} strokeWidth={2} />
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: '700',
                  color: colors.text,
                  lineHeight: 15,
                  includeFontPadding: false,
                }}
              >
                Copier le code
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Usage progress */}
        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <View
            style={{
              padding: 16,
              borderRadius: 18,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: colors.textFaint,
                  letterSpacing: 0.5,
                }}
              >
                UTILISATIONS
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: colors.text,
                  fontVariant: ['tabular-nums'],
                }}
              >
                {promo.used} / {promo.cap}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                height: 8,
                borderRadius: 999,
                backgroundColor: colors.bgSunken,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  width: `${usagePct}%`,
                  backgroundColor: colors.primary,
                }}
              />
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: 24, paddingTop: 14, flexDirection: 'row', gap: 10 }}>
          <Stat Icon={Users} label="Clients" value={String(promo.used)} />
          <Stat Icon={TrendingUp} label="CA généré" value={promo.revenue} />
          <Stat Icon={Calendar} label="Restant" value="12 j" />
        </View>

        {/* Actions */}
        <View style={{ paddingHorizontal: 24, paddingTop: 22, gap: 10 }}>
          <Pressable
            onPress={() => haptic.light()}
            style={{
              height: 52,
              borderRadius: 16,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Pause size={15} color={colors.text} strokeWidth={2} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.text,
                lineHeight: 17,
                includeFontPadding: false,
              }}
            >
              Mettre en pause
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              haptic.medium();
              router.back();
            }}
            style={{
              height: 52,
              borderRadius: 16,
              backgroundColor: 'rgba(209,79,60,0.08)',
              borderWidth: 1,
              borderColor: 'rgba(209,79,60,0.25)',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <X size={15} color={colors.danger} strokeWidth={2} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.danger,
                lineHeight: 17,
                includeFontPadding: false,
              }}
            >
              Désactiver définitivement
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({
  Icon,
  label,
  value,
}: {
  Icon: typeof Users;
  label: string;
  value: string;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        borderRadius: 16,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Icon size={13} color={colors.textMuted} strokeWidth={1.75} />
      <Text
        style={{
          fontSize: 10.5,
          fontWeight: '700',
          color: colors.textFaint,
          letterSpacing: 0.5,
          marginTop: 6,
        }}
      >
        {label.toUpperCase()}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: colors.text,
          marginTop: 2,
          fontVariant: ['tabular-nums'],
          letterSpacing: -0.2,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
