import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Camera, Image as ImageIcon, RotateCcw, X, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';
import { haptic } from '../../src/lib/haptics';

const FRAME_W = 300;
const FRAME_H = 190;

export default function KycCaptureRoute() {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);

  // Pulsing frame
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
      -1,
      true,
    );
  }, [pulse]);

  const cornerStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + 0.45 * pulse.value,
  }));

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: '#0E1311' }} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView
        edges={['top', 'bottom']}
        style={{
          flex: 1,
          backgroundColor: '#0E1311',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <View
          style={{
            width: 76,
            height: 76,
            borderRadius: 22,
            backgroundColor: 'rgba(255,255,255,0.08)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Camera size={32} color="#FFFFFF" strokeWidth={1.5} />
        </View>
        <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '700', marginTop: 22, textAlign: 'center' }}>
          Autorise la caméra
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', marginTop: 10, maxWidth: 280, lineHeight: 20 }}>
          On a besoin de la caméra pour scanner ta pièce d'identité. Les images restent chiffrées.
        </Text>
        <View style={{ marginTop: 28, width: '100%', gap: 8 }}>
          <Button variant="primary" size="lg" block label="Autoriser la caméra" onPress={() => requestPermission()} />
          <Button variant="ghost" size="sm" block label="Retour" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const onShoot = async () => {
    if (capturing) return;
    setCapturing(true);
    haptic.medium();
    try {
      await camRef.current?.takePictureAsync({ quality: 0.8, skipProcessing: true });
    } catch {
      // ignore
    }
    router.replace('/kyc/pending');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0E1311' }}>
      <CameraView
        ref={camRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        facing="back"
      />

      {/* Top bar */}
      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 38,
              height: 38,
              borderRadius: 999,
              backgroundColor: 'rgba(0,0,0,0.45)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} color="#FFFFFF" />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 7,
              borderRadius: 999,
              backgroundColor: 'rgba(0,0,0,0.45)',
            }}
          >
            <ShieldCheck size={13} color="#FFFFFF" strokeWidth={2} />
            <Text style={{ fontSize: 12, fontWeight: '600', color: '#FFFFFF', letterSpacing: 0.2 }}>
              Recto CNI · 2 / 3
            </Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Frame guide centered */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        pointerEvents="none"
      >
        <View style={{ width: FRAME_W, height: FRAME_H, position: 'relative' }}>
          {[
            { top: -4, left: -4, br: { tl: 16 }, dir: { right: false, bottom: false } },
            { top: -4, right: -4, br: { tr: 16 }, dir: { left: false, bottom: false } },
            { bottom: -4, left: -4, br: { bl: 16 }, dir: { right: false, top: false } },
            { bottom: -4, right: -4, br: { br: 16 }, dir: { left: false, top: false } },
          ].map((c, i) => (
            <Animated.View
              key={i}
              style={[
                {
                  position: 'absolute',
                  ...c,
                  width: 32,
                  height: 32,
                  borderWidth: 4,
                  borderColor: '#FFFFFF',
                  borderTopLeftRadius: c.br.tl ?? 0,
                  borderTopRightRadius: c.br.tr ?? 0,
                  borderBottomLeftRadius: c.br.bl ?? 0,
                  borderBottomRightRadius: c.br.br ?? 0,
                  borderRightWidth: c.dir.right === false ? 0 : 4,
                  borderLeftWidth: c.dir.left === false ? 0 : 4,
                  borderTopWidth: c.dir.top === false ? 0 : 4,
                  borderBottomWidth: c.dir.bottom === false ? 0 : 4,
                },
                cornerStyle,
              ]}
            />
          ))}
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: '22%',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.5)',
            maxWidth: 320,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 13, textAlign: 'center', letterSpacing: 0 }}>
            Cadre la pièce dans le rectangle. Fond uni, pas de reflet.
          </Text>
        </View>
      </View>

      {/* Bottom controls — pinned to the bottom of the screen */}
      <SafeAreaView
        edges={['bottom']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingBottom: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            paddingBottom: 8,
          }}
        >
          <Pressable
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              backgroundColor: 'rgba(0,0,0,0.45)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.14)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageIcon size={20} color="#FFFFFF" strokeWidth={1.75} />
          </Pressable>

          <Pressable
            disabled={capturing}
            onPress={onShoot}
            style={{
              width: 82,
              height: 82,
              borderRadius: 999,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: capturing ? 0.55 : 1,
            }}
          >
            <View
              style={{
                width: 66,
                height: 66,
                borderRadius: 999,
                borderWidth: 3,
                borderColor: '#0E1311',
              }}
            />
          </Pressable>

          <Pressable
            style={{
              width: 52,
              height: 52,
              borderRadius: 999,
              backgroundColor: 'rgba(0,0,0,0.45)',
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.14)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RotateCcw size={20} color="#FFFFFF" strokeWidth={1.75} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
