import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Check, Clock, Bell } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';
import { haptic } from '../../src/lib/haptics';

const SUBMITTED = ['CNI recto', 'CNI verso', 'Selfie de contrôle'];

export default function KycPendingRoute() {
  const { colors } = useTheme();

  // Check icon entrance — scale + opacity
  const checkScale = useSharedValue(0);
  const ringScale = useSharedValue(0.6);
  const ringOpacity = useSharedValue(0);

  useEffect(() => {
    haptic.success();
    checkScale.value = withSequence(
      withTiming(0, { duration: 0 }),
      withSpring(1, { damping: 9, stiffness: 140, mass: 0.7 }),
    );
    ringScale.value = withDelay(120, withTiming(1.6, { duration: 700, easing: Easing.out(Easing.quad) }));
    ringOpacity.value = withSequence(
      withDelay(120, withTiming(1, { duration: 60 })),
      withTiming(0, { duration: 640, easing: Easing.out(Easing.quad) }),
    );
  }, [checkScale, ringOpacity, ringScale]);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkScale.value,
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 28, paddingTop: 24, paddingBottom: 16 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* Animated check badge with expanding ring */}
          <View style={{ width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: 120,
                  height: 120,
                  borderRadius: 999,
                  backgroundColor: colors.primary,
                },
                ringStyle,
              ]}
            />
            <Animated.View
              style={[
                {
                  width: 92,
                  height: 92,
                  borderRadius: 999,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: colors.primary,
                  shadowOpacity: 0.35,
                  shadowRadius: 22,
                  shadowOffset: { width: 0, height: 12 },
                  elevation: 10,
                },
                checkStyle,
              ]}
            >
              <Check size={42} color="#FFFFFF" strokeWidth={3} />
            </Animated.View>
          </View>

          <Text variant="dispL" center style={{ fontSize: 26, marginTop: 26 }}>
            C'est envoyé !
          </Text>
          <Text
            variant="bodyM"
            tone="muted"
            center
            style={{ marginTop: 10, fontSize: 14.5, lineHeight: 21, maxWidth: 300, letterSpacing: 0 }}
          >
            On vérifie tes documents et on te tient au courant. En attendant, tu peux continuer à utiliser Linky normalement.
          </Text>

          {/* ETA chip */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 999,
              backgroundColor: colors.primarySoft,
              marginTop: 18,
            }}
          >
            <Clock size={13} color={colors.primaryDeep} strokeWidth={2.25} />
            <Text style={{ fontSize: 12.5, fontWeight: '600', color: colors.primaryDeep, letterSpacing: 0.1 }}>
              Réponse sous 48 h
            </Text>
          </View>

          {/* Submitted docs */}
          <View
            style={{
              marginTop: 28,
              width: '100%',
              padding: 16,
              borderRadius: 16,
              backgroundColor: colors.bgSunken,
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textFaint, letterSpacing: 0.6 }}>
              ENVOYÉ
            </Text>
            {SUBMITTED.map((t) => (
              <View key={t} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={11} color="#FFFFFF" strokeWidth={3.5} />
                </View>
                <Text style={{ fontSize: 13.5, color: colors.text }}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
            <Bell size={12} color={colors.textMuted} strokeWidth={2} />
            <Text style={{ fontSize: 12, color: colors.textMuted, letterSpacing: 0 }}>
              On t'envoie une notification dès que c'est validé.
            </Text>
          </View>
          <Button variant="dark" size="lg" block label="Continuer sur Linky" onPress={() => router.replace('/(tabs)')} />
          <Button variant="ghost" size="sm" block label="Retour au profil" onPress={() => router.replace('/(tabs)/profil')} />
        </View>
      </View>
    </SafeAreaView>
  );
}
