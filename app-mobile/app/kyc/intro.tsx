import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, IdCard, Camera, ScanFace, ShieldCheck, Lock, Clock } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';

const STEPS = [
  { n: '01', label: 'Choisis ta pièce', Icon: IdCard },
  { n: '02', label: 'Scanne recto / verso', Icon: Camera },
  { n: '03', label: 'Selfie de contrôle', Icon: ScanFace },
];

const ASSURANCES = [
  { Icon: Lock, label: 'Données chiffrées de bout en bout' },
  { Icon: Clock, label: 'Réponse sous 48 h' },
  { Icon: ShieldCheck, label: 'Conforme à la réglementation guinéenne' },
];

export default function KycIntroRoute() {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ paddingTop: 8, paddingBottom: 24, flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace('/(tabs)');
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
            Confirme que c'est{'\n'}bien toi.
          </Text>
          <Text
            variant="bodyM"
            tone="muted"
            style={{ marginTop: 10, fontSize: 15, lineHeight: 22, letterSpacing: 0 }}
          >
            En 3 étapes, on s'assure de ton identité pour protéger tes paiements et débloquer les fonctionnalités vendeur.
          </Text>

          {/* Steps */}
          <View style={{ marginTop: 32, gap: 14 }}>
            {STEPS.map((s, idx) => {
              const Icon = s.Icon;
              return (
                <View
                  key={s.n}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    paddingVertical: 6,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: colors.border,
                      backgroundColor: colors.bg,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} color={colors.text} strokeWidth={1.75} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textFaint, letterSpacing: 0.6 }}>
                      {s.n}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 1 }}>
                      {s.label}
                    </Text>
                  </View>
                  {idx < STEPS.length - 1 && (
                    <View style={{ width: 1, height: 0 }} />
                  )}
                </View>
              );
            })}
          </View>

          {/* Trust strip */}
          <View
            style={{
              marginTop: 32,
              padding: 14,
              borderRadius: 14,
              backgroundColor: colors.bgSunken,
              gap: 8,
            }}
          >
            {ASSURANCES.map(({ Icon, label }) => (
              <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Icon size={14} color={colors.primary} strokeWidth={2} />
                <Text style={{ fontSize: 12.5, color: colors.textMuted, letterSpacing: 0 }}>
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 4, paddingBottom: 4 }}>
          <Button variant="dark" size="lg" block label="Commencer" onPress={() => router.push('/kyc/choose-doc')} />
          <Button
            variant="ghost"
            size="sm"
            block
            label="Plus tard"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace('/(tabs)');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
