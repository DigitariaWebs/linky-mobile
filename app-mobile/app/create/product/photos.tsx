import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { Button } from '../../../src/components/primitives/Button';
import { ProgressDots } from '../../../src/components/primitives/ProgressDots';
import { TopBar } from '../../../src/components/nav/TopBar';
import { StickyBottom } from '../../../src/components/nav/StickyBottom';
import { TrustStrip } from '../../../src/components/primitives/TrustStrip';
import { I } from '../../../src/icons/Icon';
import { photos } from '../../../src/data/photos';

export default function CreatePhotosRoute() {
  const { colors, radii } = useTheme();
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar title="Créer une annonce" back />
      <View style={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <ProgressDots total={6} current={4} />
        <Text variant="micro" tone="muted" style={{ marginTop: 14 }}>
          Étape 5 / 6 · Photos
        </Text>
        <Text variant="dispL" style={{ fontSize: 22, marginTop: 6 }}>
          Ajoute des photos
        </Text>
        <Text variant="caption" tone="muted" style={{ marginTop: 6, letterSpacing: 0 }}>
          Plus tu en mets, plus tu vends vite. Maximum 8.
        </Text>

        <View style={{ marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <View style={{ width: '66%', aspectRatio: 1, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
            <Image source={photos.iphone} style={{ flex: 1 }} contentFit="cover" />
            <View
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: colors.accent,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 999,
              }}
            >
              <Text style={{ fontSize: 9, fontWeight: '700', color: '#2A1A05', letterSpacing: 0.4 }}>PRINCIPALE</Text>
            </View>
          </View>
          <View
            style={{
              width: '32%',
              gap: 8,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ aspectRatio: 1, borderRadius: 12, overflow: 'hidden' }}>
              <Image source={photos.iphone2} style={{ flex: 1 }} contentFit="cover" />
            </View>
            <Pressable
              style={{
                aspectRatio: 1,
                borderRadius: 12,
                backgroundColor: colors.bgElev,
                borderWidth: 1.5,
                borderStyle: 'dashed',
                borderColor: colors.borderStrong,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <I.camera size={20} color={colors.textMuted} />
              <Text variant="micro" tone="muted" style={{ letterSpacing: 0, textTransform: 'none' }}>
                Ajouter
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <TrustStrip tone="primary">
            <Text style={{ color: colors.primaryDeep, fontSize: 11.5 }}>
              Maintiens une photo pour la définir comme principale.
            </Text>
          </TrustStrip>
        </View>
      </View>
      <StickyBottom style={{ flexDirection: 'row', gap: 8 }}>
        <Button variant="secondary" label="Retour" onPress={() => router.back()} />
        <Button label="Continuer" style={{ flex: 1 }} onPress={() => router.push('/create/product/preview')} />
      </StickyBottom>
    </SafeAreaView>
  );
}
