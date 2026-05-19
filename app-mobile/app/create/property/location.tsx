import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Svg, { Line, Rect } from 'react-native-svg';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { Button } from '../../../src/components/primitives/Button';
import { ProgressDots } from '../../../src/components/primitives/ProgressDots';
import { TopBar } from '../../../src/components/nav/TopBar';
import { StickyBottom } from '../../../src/components/nav/StickyBottom';
import { I } from '../../../src/icons/Icon';
import { useToast } from '../../../src/components/feedback/Toast';

export default function CreatePropertyLocationRoute() {
  const { colors, radii } = useTheme();
  const { show } = useToast();
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar title="Localisation GPS" back />
      <View style={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <ProgressDots total={6} current={4} />
        <Text variant="micro" tone="muted" style={{ marginTop: 14 }}>
          Étape 5 / 6 · Localisation
        </Text>
        <Text variant="dispL" style={{ fontSize: 22, marginTop: 6, marginBottom: 16 }}>
          Place l'épingle sur ta carte
        </Text>

        <View style={{ aspectRatio: 1, borderRadius: 16, overflow: 'hidden', backgroundColor: '#C4D9C8', position: 'relative' }}>
          <Svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="none">
            <Line x1="0" y1="150" x2="300" y2="170" stroke="rgba(255,255,255,0.9)" strokeWidth={14} />
            <Line x1="100" y1="0" x2="120" y2="300" stroke="rgba(255,255,255,0.7)" strokeWidth={10} />
            <Line x1="220" y1="0" x2="200" y2="300" stroke="rgba(255,255,255,0.5)" strokeWidth={6} />
            {[
              [60, 80, 28],
              [150, 90, 22],
              [240, 80, 32],
              [180, 200, 28],
              [70, 230, 24],
            ].map(([x, y, s], i) => (
              <Rect key={i} x={x} y={y} width={s} height={s} fill="rgba(14,110,85,0.18)" rx={3} />
            ))}
          </Svg>
          <View
            style={{
              position: 'absolute',
              top: '47%',
              left: '50%',
              transform: [{ translateX: -18 }, { translateY: -36 }],
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                backgroundColor: colors.primary,
                borderWidth: 4,
                borderColor: '#FFFFFF',
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: 'rgba(255,255,255,0.92)',
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '600', fontVariant: ['tabular-nums'] }}>9.5092° N · 13.7122° W</Text>
          </View>
        </View>

        <View style={{ marginTop: 14, flexDirection: 'row', gap: 8 }}>
          <Button variant="secondary" style={{ flex: 1 }} label="Ma position" leading={<I.pin size={14} color={colors.text} />} />
          <Button variant="secondary" style={{ flex: 1 }} label="Saisir manuellement" leading={<I.edit size={14} color={colors.text} />} />
        </View>
      </View>
      <StickyBottom style={{ flexDirection: 'row', gap: 8 }}>
        <Button variant="secondary" label="Retour" onPress={() => router.back()} />
        <Button
          label="Continuer"
          style={{ flex: 1 }}
          onPress={() => router.push('/create/property/photos')}
        />
      </StickyBottom>
    </SafeAreaView>
  );
}
