import { useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { Input } from '../../../src/components/primitives/Input';
import { Chip } from '../../../src/components/primitives/Chip';
import { Button } from '../../../src/components/primitives/Button';
import { ProgressDots } from '../../../src/components/primitives/ProgressDots';
import { TopBar } from '../../../src/components/nav/TopBar';
import { StickyBottom } from '../../../src/components/nav/StickyBottom';
import { Sheet } from '../../../src/components/sheets/Sheet';
import { I } from '../../../src/icons/Icon';
import { useCreateListing } from '../../../src/stores/createListing';
import { gnfToEur } from '../../../src/lib/currency';

const AI_SAMPLE = `iPhone 12 Pro 256Go en excellent état, peu utilisé pendant ${'12 mois'}.
Écran impeccable, batterie à 91% de capacité. Livré avec la boîte d'origine, le câble Lightning et un chargeur compatible. Aucune rayure visible, vendu avec coque de protection offerte.`;

export default function CreateProductDetailsRoute() {
  const { colors } = useTheme();
  const state = useCreateListing();
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState('');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar title="Créer une annonce" back />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}>
        <ProgressDots total={6} current={3} />
        <Text variant="micro" tone="muted" style={{ marginTop: 14 }}>
          Étape 4 / 6 · Détails
        </Text>
        <Text variant="dispL" style={{ fontSize: 22, marginTop: 6, marginBottom: 18 }}>
          Décris ton article
        </Text>

        <View style={{ gap: 12 }}>
          <Input label="Titre" value={state.title} onChangeText={(t) => state.set('title', t)} />

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text variant="micro" tone="muted" style={{ textTransform: 'none', letterSpacing: 0 }}>
                Description
              </Text>
              <Text variant="micro" tone="faint" style={{ fontVariant: ['tabular-nums'] }}>
                {state.description.length} / 600
              </Text>
            </View>
            <Input
              multiline
              value={state.description}
              onChangeText={(t) => state.set('description', t.slice(0, 600))}
            />
            <Pressable
              onPress={() => {
                setAiOpen(true);
                setAiLoading(true);
                setAiText('');
                setTimeout(() => {
                  setAiLoading(false);
                  setAiText(AI_SAMPLE);
                }, 1200);
              }}
              style={{
                marginTop: 8,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1.5,
                borderStyle: 'dashed',
                borderColor: colors.accent,
                backgroundColor: colors.accentSoft,
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}
            >
              <I.sparkle size={14} color={colors.accentText} />
              <Text style={{ color: colors.accentText, fontSize: 12, fontWeight: '600' }}>Générer avec l'IA</Text>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1 }}>
              <Input
                label="Prix"
                value={new Intl.NumberFormat('fr-FR').format(state.priceGnf)}
                onChangeText={(t) => state.set('priceGnf', Number(t.replace(/\D/g, '')) || 0)}
                keyboardType="number-pad"
                trailingIcon="check"
                helperText={`≈ ${gnfToEur(state.priceGnf)} €`}
              />
            </View>
            <View style={{ width: 100 }}>
              <Input
                label="Quantité"
                value={String(state.quantity)}
                onChangeText={(t) => state.set('quantity', Number(t.replace(/\D/g, '')) || 1)}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View>
            <Text variant="micro" tone="muted" style={{ textTransform: 'none', letterSpacing: 0, marginBottom: 6 }}>
              État
            </Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {(['neuf', 'occasion', 'reconditionné'] as const).map((c) => (
                <Chip
                  key={c}
                  label={c === 'neuf' ? 'Neuf' : c === 'occasion' ? 'Occasion' : 'Reconditionné'}
                  active={state.condition === c}
                  onPress={() => state.set('condition', c)}
                  block
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <StickyBottom style={{ flexDirection: 'row', gap: 8 }}>
        <Button variant="secondary" label="Retour" onPress={() => router.back()} />
        <Button label="Continuer" style={{ flex: 1 }} onPress={() => router.push('/create/product/photos')} />
      </StickyBottom>

      <Sheet open={aiOpen} onClose={() => setAiOpen(false)} title="Description IA" snapPoints={['55%']}>
        <View style={{ padding: 16, gap: 12 }}>
          {aiLoading ? (
            <View style={{ alignItems: 'center', padding: 32 }}>
              <Text tone="muted">L'IA rédige une description…</Text>
            </View>
          ) : (
            <Text variant="bodyM">{aiText}</Text>
          )}
          {!aiLoading && (
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Button variant="secondary" label="Régénérer" leading={<I.refresh size={14} color={colors.text} />} onPress={() => {
                setAiLoading(true);
                setTimeout(() => setAiLoading(false), 900);
              }} />
              <Button
                label="Utiliser"
                style={{ flex: 1 }}
                onPress={() => {
                  state.set('description', aiText);
                  setAiOpen(false);
                }}
              />
            </View>
          )}
        </View>
      </Sheet>
    </SafeAreaView>
  );
}
