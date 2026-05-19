import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  IdCard,
  Vote,
  Globe2,
  Briefcase,
  Check,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';
import { ScreenHeader } from '../../src/components/nav/ScreenHeader';
import { StickyBottom } from '../../src/components/nav/StickyBottom';

interface DocOption {
  id: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  recommended?: boolean;
}

const DOCS: DocOption[] = [
  { id: 'cni', title: "Carte Nationale d'Identité", desc: 'République de Guinée', Icon: IdCard, recommended: true },
  { id: 'elec', title: "Carte d'électeur", desc: 'Acceptée pour la vérification', Icon: Vote },
  { id: 'pass', title: 'Passeport', desc: 'Idéal pour la diaspora', Icon: Globe2 },
  { id: 'rcs', title: 'Registre de commerce', desc: 'Pour les commerçants enregistrés', Icon: Briefcase },
];

export default function ChooseDocRoute() {
  const { colors } = useTheme();
  const [picked, setPicked] = useState('cni');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader
        title="Choisis ta pièce."
        subtitle="Un seul document suffit pour la vérification."
        trailing={
          <View
            style={{
              paddingHorizontal: 10,
              height: 26,
              borderRadius: 999,
              backgroundColor: colors.primarySoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 10.5,
                fontWeight: '700',
                color: colors.primaryDeep,
                letterSpacing: 0.5,
                lineHeight: 12,
                includeFontPadding: false,
              }}
            >
              ÉTAPE 1 / 3
            </Text>
          </View>
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 10, paddingBottom: 140, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {DOCS.map((d) => (
          <DocCard
            key={d.id}
            doc={d}
            selected={picked === d.id}
            onPress={() => setPicked(d.id)}
          />
        ))}
      </ScrollView>

      <StickyBottom>
        <Button
          variant="dark"
          size="lg"
          block
          label="Continuer"
          onPress={() => router.push('/kyc/capture')}
        />
      </StickyBottom>
    </SafeAreaView>
  );
}

function DocCard({
  doc,
  selected,
  onPress,
}: {
  doc: DocOption;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  const Icon = doc.Icon;
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 18,
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primarySoft : colors.card,
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: selected ? colors.bg : colors.bgSunken,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          size={22}
          color={selected ? colors.primary : colors.text}
          strokeWidth={selected ? 2 : 1.75}
        />
      </View>

      {/* Title block: title on its own row, then chip + desc on next row */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14.5,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: 0,
            lineHeight: 18,
            includeFontPadding: false,
          }}
          numberOfLines={1}
        >
          {doc.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginTop: 5,
            flexWrap: 'wrap',
          }}
        >
          {doc.recommended && (
            <View
              style={{
                paddingHorizontal: 7,
                height: 18,
                borderRadius: 999,
                backgroundColor: colors.accentSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 9.5,
                  fontWeight: '700',
                  color: colors.accentText,
                  letterSpacing: 0.4,
                  lineHeight: 11,
                  includeFontPadding: false,
                }}
              >
                RECOMMANDÉ
              </Text>
            </View>
          )}
          <Text
            style={{
              fontSize: 12.5,
              color: colors.textMuted,
              letterSpacing: 0,
              lineHeight: 16,
              flexShrink: 1,
            }}
            numberOfLines={1}
          >
            {doc.desc}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          backgroundColor: selected ? colors.primary : 'transparent',
          borderWidth: selected ? 0 : 1.5,
          borderColor: colors.borderStrong,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
      </View>
    </Pressable>
  );
}
