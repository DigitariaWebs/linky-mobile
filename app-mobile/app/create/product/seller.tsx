import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { Button } from '../../../src/components/primitives/Button';
import { ProgressDots } from '../../../src/components/primitives/ProgressDots';
import { TopBar } from '../../../src/components/nav/TopBar';
import { StickyBottom } from '../../../src/components/nav/StickyBottom';
import { I, type IconKey } from '../../../src/icons/Icon';
import { useCreateListing } from '../../../src/stores/createListing';

interface OptionDef {
  id: 'particular' | 'merchant';
  title: string;
  desc: string;
  icon: IconKey;
}

const OPTIONS: OptionDef[] = [
  { id: 'particular', title: 'Particulier', desc: "Je vends mes propres affaires d'occasion ou neuves", icon: 'user' },
  { id: 'merchant', title: 'Commerçant / Boutique', desc: "Je vends régulièrement, j'ai une boutique", icon: 'store' },
];

export default function CreateProductSeller() {
  const { colors, radii } = useTheme();
  const sellerType = useCreateListing((s) => s.sellerType);
  const setVal = useCreateListing((s) => s.set);
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar title="Créer une annonce" back />
      <View style={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <ProgressDots total={6} current={0} />
        <Text variant="micro" tone="muted" style={{ marginTop: 14 }}>
          Étape 1 / 6
        </Text>
        <Text variant="dispL" style={{ fontSize: 22, marginTop: 6, marginBottom: 18 }}>
          Tu vends en tant que ?
        </Text>
        {OPTIONS.map((o) => {
          const sel = sellerType === o.id;
          const Icon = I[o.icon];
          return (
            <Pressable key={o.id} onPress={() => setVal('sellerType', o.id)}>
              <View
                style={{
                  padding: 16,
                  borderRadius: radii.lg,
                  borderWidth: sel ? 2 : 1,
                  borderColor: sel ? colors.primary : colors.border,
                  backgroundColor: colors.card,
                  marginBottom: 10,
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: sel ? colors.primarySoft : colors.bgSunken,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} color={sel ? colors.primary : colors.text} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text variant="titleM" style={{ fontSize: 14 }}>
                    {o.title}
                  </Text>
                  <Text variant="micro" tone="muted" style={{ marginTop: 2, letterSpacing: 0, textTransform: 'none' }}>
                    {o.desc}
                  </Text>
                </View>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    backgroundColor: sel ? colors.primary : 'transparent',
                    borderWidth: sel ? 0 : 1.5,
                    borderColor: colors.borderStrong,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {sel && <I.check size={13} color="#FFFFFF" stroke={3} />}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
      <StickyBottom>
        <Button size="lg" block label="Continuer" onPress={() => router.push('/create/product/category')} />
      </StickyBottom>
    </SafeAreaView>
  );
}
