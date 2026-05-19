import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Wifi,
  Car,
  Snowflake,
  Bath,
  ChefHat,
  Sofa,
  Tv,
  Shield,
  Trees,
  Waves,
  ArrowUpDown,
  Sun,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';

const AMENITIES: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: 'wifi', label: 'Wi-Fi', Icon: Wifi },
  { id: 'park', label: 'Parking', Icon: Car },
  { id: 'ac', label: 'Climatisation', Icon: Snowflake },
  { id: 'bath', label: 'Salle de bain privée', Icon: Bath },
  { id: 'kitchen', label: 'Cuisine équipée', Icon: ChefHat },
  { id: 'furn', label: 'Meublé', Icon: Sofa },
  { id: 'tv', label: 'TV', Icon: Tv },
  { id: 'sec', label: 'Gardien / sécurité', Icon: Shield },
  { id: 'garden', label: 'Jardin / cour', Icon: Trees },
  { id: 'pool', label: 'Piscine', Icon: Waves },
  { id: 'lift', label: 'Ascenseur', Icon: ArrowUpDown },
  { id: 'terrace', label: 'Balcon / terrasse', Icon: Sun },
];

export default function AmenitiesRoute() {
  const { colors } = useTheme();
  const [picked, setPicked] = useState<Set<string>>(new Set(['wifi', 'park', 'ac', 'furn']));

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ScreenHeader
          title="Équipements"
          subtitle="Coche tout ce que ton bien propose."
        />

        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {AMENITIES.map((a) => {
            const on = picked.has(a.id);
            return (
              <Pressable
                key={a.id}
                onPress={() => {
                  haptic.selection();
                  setPicked((p) => {
                    const next = new Set(p);
                    if (next.has(a.id)) next.delete(a.id);
                    else next.add(a.id);
                    return next;
                  });
                }}
                style={{
                  flexBasis: '47%',
                  flexGrow: 1,
                  padding: 14,
                  borderRadius: 16,
                  backgroundColor: on ? colors.primarySoft : colors.card,
                  borderWidth: on ? 1.5 : 1,
                  borderColor: on ? colors.primary : colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    backgroundColor: on ? colors.bg : colors.bgSunken,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <a.Icon
                    size={16}
                    color={on ? colors.primary : colors.text}
                    strokeWidth={1.75}
                  />
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 13,
                    fontWeight: '600',
                    color: on ? colors.primaryDeep : colors.text,
                    letterSpacing: 0,
                    lineHeight: 16,
                    includeFontPadding: false,
                  }}
                  numberOfLines={2}
                >
                  {a.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <SafeAreaView
        edges={['bottom']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 8,
          backgroundColor: colors.bg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Pressable
          onPress={() => {
            haptic.medium();
            router.push('/create/property/preview');
          }}
          style={{
            height: 56,
            borderRadius: 16,
            backgroundColor: colors.text,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: colors.bg,
              lineHeight: 18,
              includeFontPadding: false,
            }}
          >
            Continuer · {picked.size} sélectionné{picked.size > 1 ? 's' : ''}
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}
