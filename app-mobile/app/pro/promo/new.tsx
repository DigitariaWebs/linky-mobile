import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Tag, Calendar, Users } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';

const DURATIONS = [
  { id: '7d', label: '7 jours' },
  { id: '14d', label: '14 jours' },
  { id: '30d', label: '30 jours' },
  { id: 'custom', label: 'Custom' },
];

export default function PromoNewRoute() {
  const { colors } = useTheme();
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('15');
  const [duration, setDuration] = useState('14d');
  const [cap, setCap] = useState('100');

  const valid = code.length >= 3 && parseInt(discount, 10) > 0;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader title="Nouveau code promo" />

        <View style={{ paddingHorizontal: 24, gap: 18 }}>
          {/* Code */}
          <Field label="CODE PROMO" Icon={Tag}>
            <TextInput
              value={code}
              onChangeText={(t) => setCode(t.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
              placeholder="TABASKI25"
              placeholderTextColor={colors.textFaint}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={16}
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '700',
                color: colors.text,
                letterSpacing: 1,
                padding: 0,
              }}
            />
          </Field>

          {/* Discount % */}
          <View>
            <Text style={labelStyle(colors)}>RÉDUCTION (%)</Text>
            <View
              style={{
                height: 56,
                borderRadius: 16,
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
              }}
            >
              <TextInput
                value={discount}
                onChangeText={(t) => setDiscount(t.replace(/\D/g, '').slice(0, 2))}
                keyboardType="number-pad"
                placeholder="15"
                placeholderTextColor={colors.textFaint}
                style={{
                  flex: 1,
                  fontSize: 22,
                  fontWeight: '700',
                  color: colors.text,
                  fontVariant: ['tabular-nums'],
                  padding: 0,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: colors.textMuted,
                }}
              >
                %
              </Text>
            </View>
          </View>

          {/* Duration */}
          <View>
            <Text style={labelStyle(colors)}>DURÉE</Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {DURATIONS.map((d) => {
                const active = duration === d.id;
                return (
                  <Pressable
                    key={d.id}
                    onPress={() => {
                      haptic.selection();
                      setDuration(d.id);
                    }}
                    style={{
                      flex: 1,
                      height: 44,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: active ? colors.text : colors.border,
                      backgroundColor: active ? colors.text : colors.card,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: '700',
                        color: active ? colors.bg : colors.text,
                        letterSpacing: 0,
                        lineHeight: 15,
                        includeFontPadding: false,
                      }}
                    >
                      {d.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Cap */}
          <Field label="LIMITE D'UTILISATIONS" Icon={Users}>
            <TextInput
              value={cap}
              onChangeText={(t) => setCap(t.replace(/\D/g, '').slice(0, 5))}
              keyboardType="number-pad"
              placeholder="100"
              placeholderTextColor={colors.textFaint}
              style={{
                flex: 1,
                fontSize: 15.5,
                fontWeight: '600',
                color: colors.text,
                fontVariant: ['tabular-nums'],
                padding: 0,
              }}
            />
          </Field>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
          <Pressable
            disabled={!valid}
            onPress={() => {
              haptic.medium();
              router.replace('/pro/promo');
            }}
            style={{
              height: 56,
              borderRadius: 16,
              backgroundColor: valid ? colors.text : colors.bgSunken,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: valid ? 1 : 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: valid ? colors.bg : colors.textFaint,
                lineHeight: 18,
                includeFontPadding: false,
              }}
            >
              Activer le code
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const labelStyle = (colors: ReturnType<typeof useTheme>['colors']) => ({
  fontSize: 11,
  fontWeight: '700' as const,
  color: colors.textFaint,
  letterSpacing: 0.6,
  marginBottom: 8,
});

function Field({
  label,
  Icon,
  children,
}: {
  label: string;
  Icon: typeof Tag;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={labelStyle(colors)}>{label}</Text>
      <View
        style={{
          height: 56,
          borderRadius: 16,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          gap: 10,
        }}
      >
        <Icon size={18} color={colors.textMuted} strokeWidth={1.75} />
        {children}
      </View>
    </View>
  );
}
