import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';
import { useAuth } from '../../src/stores/auth';
import { maskPhone } from '../../src/lib/format';
import { haptic } from '../../src/lib/haptics';

const CODE_LENGTH = 6;

function OtpCells({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { colors } = useTheme();
  const ref = useRef<TextInput>(null);
  return (
    <Pressable
      onPress={() => ref.current?.focus()}
      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      accessibilityLabel="Code à 6 chiffres"
    >
      {Array.from({ length: CODE_LENGTH }).map((_, i) => {
        const ch = value[i] ?? '';
        const filled = !!ch;
        const isCursor = value.length === i;
        return (
          <View
            key={i}
            style={{
              width: 48,
              height: 56,
              borderRadius: 14,
              borderWidth: filled || isCursor ? 2 : 1,
              borderColor: filled ? colors.primary : isCursor ? colors.text : colors.border,
              backgroundColor: filled ? colors.primarySoft : colors.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {filled ? (
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: colors.primaryDeep,
                  textAlign: 'center',
                  lineHeight: 26,
                  includeFontPadding: false,
                }}
              >
                {ch}
              </Text>
            ) : isCursor ? (
              <View
                style={{
                  width: 2,
                  height: 22,
                  borderRadius: 1,
                  backgroundColor: colors.text,
                }}
              />
            ) : (
              <View style={{ width: 8, height: 2, borderRadius: 1, backgroundColor: colors.border }} />
            )}
          </View>
        );
      })}
      <TextInput
        ref={ref}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, '').slice(0, CODE_LENGTH))}
        keyboardType="number-pad"
        autoFocus
        maxLength={CODE_LENGTH}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
      />
    </Pressable>
  );
}

export default function OtpRoute() {
  const { colors } = useTheme();
  const phone = useAuth((s) => s.pendingPhone);
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(42);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      haptic.success();
      const t = setTimeout(() => router.push('/(onboarding)/profile-setup'), 220);
      return () => clearTimeout(t);
    }
  }, [code]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ paddingTop: 8, paddingBottom: 24 }}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace('/(onboarding)/phone');
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={18} color={colors.text} />
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: colors.primarySoft,
              marginBottom: 14,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '700', color: colors.primaryDeep, letterSpacing: 0.4 }}>
              VÉRIFICATION
            </Text>
          </View>

          <Text variant="dispL" style={{ fontSize: 32, lineHeight: 38 }}>
            Entre le code.
          </Text>
          <Text
            variant="bodyM"
            tone="muted"
            style={{ marginTop: 10, fontSize: 15, lineHeight: 22, letterSpacing: 0 }}
          >
            Envoyé au{' '}
            <Text
              style={{
                color: colors.text,
                fontWeight: '600',
                fontVariant: ['tabular-nums'],
                letterSpacing: 0.3,
              }}
            >
              {maskPhone(phone)}
            </Text>
            .
          </Text>

          <View style={{ marginTop: 32 }}>
            <OtpCells value={code} onChange={setCode} />
          </View>

          {/* Resend row */}
          <View style={{ marginTop: 26, alignItems: 'center' }}>
            {seconds > 0 ? (
              <Text style={{ fontSize: 13, color: colors.textMuted, letterSpacing: 0 }}>
                Renvoyer dans{' '}
                <Text
                  style={{
                    color: colors.text,
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {mm}:{ss}
                </Text>
              </Text>
            ) : (
              <Pressable
                onPress={() => {
                  setSeconds(60);
                  haptic.light();
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <RefreshCw size={13} color={colors.text} strokeWidth={2} />
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.text }}>
                  Renvoyer le code
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        <View style={{ paddingBottom: 4 }}>
          <Button
            variant="dark"
            size="lg"
            block
            label="Vérifier"
            disabled={code.length !== CODE_LENGTH}
            onPress={() => router.push('/(onboarding)/profile-setup')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
