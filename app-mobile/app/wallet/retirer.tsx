import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';
import { Chip } from '../../src/components/primitives/Chip';
import { TopBar } from '../../src/components/nav/TopBar';
import { StickyBottom } from '../../src/components/nav/StickyBottom';
import { MicroLabel } from '../../src/components/lists/SectionHeader';
import { Card } from '../../src/components/primitives/Card';
import { SettingsRow } from '../../src/components/lists/SettingsRow';
import { formatGNF } from '../../src/lib/format';
import { useToast } from '../../src/components/feedback/Toast';

export default function RetirerRoute() {
  const { colors } = useTheme();
  const [amount, setAmount] = useState(200_000);
  const { show } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar title="Retirer" back />
      <View style={{ paddingHorizontal: 16, paddingBottom: 120 }}>
        <MicroLabel label="Vers" />
        <Card padding={0} style={{ overflow: 'hidden', marginBottom: 18 }}>
          <SettingsRow icon="phone" label="Orange Money" sub="+224 622 •• 12 88" />
          <SettingsRow icon="phone" label="MTN Mobile Money" sub="+224 657 •• 44 02" divider={false} />
        </Card>

        <MicroLabel label="Montant" />
        <View
          style={{
            backgroundColor: colors.bgElev,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 36, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
            {formatGNF(amount).replace(' GNF', '')}
          </Text>
          <Text variant="caption" tone="muted" style={{ marginTop: 4, letterSpacing: 0 }}>
            GNF
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 6, marginTop: 12 }}>
          {[100_000, 200_000, 500_000, 850_000].map((v) => (
            <Chip key={v} label={new Intl.NumberFormat('fr-FR').format(v)} active={v === amount} onPress={() => setAmount(v)} block />
          ))}
        </View>
      </View>

      <StickyBottom>
        <Button
          size="lg"
          block
          loading={loading}
          label={`Retirer ${formatGNF(amount)}`}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              show('Retrait en cours de traitement', 'info');
              router.back();
            }, 1000);
          }}
        />
      </StickyBottom>
    </SafeAreaView>
  );
}
