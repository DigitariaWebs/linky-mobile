import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Phone, Check, MoreVertical, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { ScreenHeader } from '../../src/components/nav/ScreenHeader';
import { haptic } from '../../src/lib/haptics';

interface PhoneNumber {
  id: string;
  number: string;
  operator: 'Orange' | 'MTN' | 'Cellcom';
  verified: boolean;
  primary: boolean;
}

const PHONES: PhoneNumber[] = [
  { id: '1', number: '+224 622 55 12 88', operator: 'Orange', verified: true, primary: true },
  { id: '2', number: '+224 657 44 02 18', operator: 'MTN', verified: true, primary: false },
];

const OPERATOR_TINT: Record<PhoneNumber['operator'], { bg: string; fg: string }> = {
  Orange: { bg: '#FCE7D3', fg: '#A04D08' },
  MTN: { bg: '#FFEFBF', fg: '#8A6308' },
  Cellcom: { bg: '#E0F0E8', fg: '#155F45' },
};

export default function PhonesRoute() {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Numéros de téléphone"
          subtitle="Les numéros utilisés pour ta connexion et tes notifications SMS."
        />

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          {PHONES.map((p) => (
            <PhoneCard key={p.id} phone={p} />
          ))}
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <Pressable
            onPress={() => haptic.light()}
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
              Ajouter un numéro
            </Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              backgroundColor: colors.bgSunken,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <ShieldCheck size={14} color={colors.primary} strokeWidth={2} style={{ marginTop: 1 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 12.5,
                lineHeight: 18,
                color: colors.textMuted,
                letterSpacing: 0,
              }}
            >
              Tes numéros restent privés. On ne les partage jamais avec les autres utilisateurs sans ton accord.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PhoneCard({ phone }: { phone: PhoneNumber }) {
  const { colors } = useTheme();
  const tint = OPERATOR_TINT[phone.operator];
  return (
    <View
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: phone.primary ? 1.5 : 1,
        borderColor: phone.primary ? colors.primary : colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: phone.primary ? colors.primarySoft : colors.bgSunken,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Phone
          size={18}
          color={phone.primary ? colors.primary : colors.text}
          strokeWidth={1.75}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: 0.2,
            lineHeight: 18,
            includeFontPadding: false,
            fontVariant: ['tabular-nums'],
          }}
        >
          {phone.number}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 6,
          }}
        >
          <View
            style={{
              paddingHorizontal: 8,
              height: 20,
              borderRadius: 999,
              backgroundColor: tint.bg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color: tint.fg,
                lineHeight: 12,
                includeFontPadding: false,
                letterSpacing: 0.3,
              }}
            >
              {phone.operator.toUpperCase()}
            </Text>
          </View>
          {phone.primary && (
            <View
              style={{
                paddingHorizontal: 8,
                height: 20,
                borderRadius: 999,
                backgroundColor: colors.primarySoft,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 3,
              }}
            >
              <Check size={9} color={colors.primaryDeep} strokeWidth={3} />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  color: colors.primaryDeep,
                  lineHeight: 12,
                  includeFontPadding: false,
                  letterSpacing: 0.3,
                }}
              >
                PRINCIPAL
              </Text>
            </View>
          )}
          {phone.verified && !phone.primary && (
            <Text style={{ fontSize: 11, color: colors.textMuted, letterSpacing: 0 }}>
              · Vérifié
            </Text>
          )}
        </View>
      </View>
      <Pressable
        hitSlop={6}
        style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}
      >
        <MoreVertical size={16} color={colors.textMuted} strokeWidth={1.75} />
      </Pressable>
    </View>
  );
}
