import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { Button } from '../../../src/components/primitives/Button';
import { ProgressDots } from '../../../src/components/primitives/ProgressDots';
import { TopBar } from '../../../src/components/nav/TopBar';
import { StickyBottom } from '../../../src/components/nav/StickyBottom';
import { TrustStrip } from '../../../src/components/primitives/TrustStrip';
import { I } from '../../../src/icons/Icon';
import { photos } from '../../../src/data/photos';
import { useCreateListing } from '../../../src/stores/createListing';
import { formatGNF } from '../../../src/lib/format';
import { useToast } from '../../../src/components/feedback/Toast';

export default function CreatePreviewRoute() {
  const { colors, radii } = useTheme();
  const state = useCreateListing();
  const { show } = useToast();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar title="Aperçu" back />
      <View style={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <ProgressDots total={6} current={5} />
        <Text variant="dispL" style={{ fontSize: 22, marginTop: 14, marginBottom: 6 }}>
          Comme dans le feed
        </Text>
        <Text variant="caption" tone="muted" style={{ marginBottom: 18, letterSpacing: 0 }}>
          Voilà comment ton annonce apparaîtra aux acheteurs.
        </Text>

        <View style={{ aspectRatio: 9 / 14, borderRadius: 18, overflow: 'hidden', backgroundColor: colors.discoverBg }}>
          <Image source={photos.iphone} style={{ flex: 1 }} contentFit="cover" />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent', 'rgba(0,0,0,0.85)']}
            locations={[0, 0.3, 0.5, 1]}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
            <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
              {state.title}
            </Text>
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 17, marginTop: 4, fontVariant: ['tabular-nums'] }}>
              {formatGNF(state.priceGnf)}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <TrustStrip tone="accent">
            <Text style={{ color: colors.accentText, fontSize: 11.5 }}>
              <Text style={{ fontWeight: '700' }}>Booste ton annonce</Text> pour apparaître en haut du feed. 5 000 GNF / jour.
            </Text>
          </TrustStrip>
        </View>
      </View>
      <StickyBottom style={{ flexDirection: 'row', gap: 8 }}>
        <Button variant="secondary" label="Modifier" onPress={() => router.back()} />
        <Button
          label="Publier mon annonce"
          style={{ flex: 1 }}
          onPress={() => {
            show('Annonce publiée 🎉', 'success');
            router.replace('/(tabs)/boutique');
          }}
        />
      </StickyBottom>
    </SafeAreaView>
  );
}
