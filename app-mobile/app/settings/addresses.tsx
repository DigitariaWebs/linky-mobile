import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  MapPin,
  Home as HomeIcon,
  Briefcase,
  MoreVertical,
  Check,
  Truck,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { ScreenHeader } from '../../src/components/nav/ScreenHeader';
import { haptic } from '../../src/lib/haptics';

type AddressKind = 'home' | 'work' | 'other';

interface Address {
  id: string;
  kind: AddressKind;
  label: string;
  street: string;
  district: string;
  city: string;
  primary: boolean;
}

const ADDRESSES: Address[] = [
  {
    id: '1',
    kind: 'home',
    label: 'Maison',
    street: 'Immeuble Le Niger, Apt 4B',
    district: 'Kaloum',
    city: 'Conakry',
    primary: true,
  },
  {
    id: '2',
    kind: 'work',
    label: 'Boutique',
    street: 'Marché Madina, allée 7',
    district: 'Matam',
    city: 'Conakry',
    primary: false,
  },
];

const KIND_ICON: Record<AddressKind, LucideIcon> = {
  home: HomeIcon,
  work: Briefcase,
  other: MapPin,
};

export default function AddressesRoute() {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <ScreenHeader
          title="Adresses"
          subtitle="Où on doit livrer ou venir chercher tes commandes."
        />

        <View style={{ paddingHorizontal: 24, gap: 10 }}>
          {ADDRESSES.map((a) => (
            <AddressCard key={a.id} address={a} />
          ))}
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <Pressable
            onPress={() => haptic.light()}
            style={{
              height: 54,
              borderRadius: 16,
              backgroundColor: colors.text,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Plus size={16} color={colors.bg} strokeWidth={2.25} />
            <Text
              style={{
                fontSize: 14.5,
                fontWeight: '700',
                color: colors.bg,
                letterSpacing: 0,
                lineHeight: 17,
                includeFontPadding: false,
              }}
            >
              Ajouter une adresse
            </Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <View
            style={{
              padding: 14,
              borderRadius: 14,
              backgroundColor: colors.bgSunken,
              flexDirection: 'row',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <Truck size={14} color={colors.primary} strokeWidth={2} style={{ marginTop: 1 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 12.5,
                lineHeight: 18,
                color: colors.textMuted,
                letterSpacing: 0,
              }}
            >
              L'adresse principale est utilisée par défaut pour les livraisons. Tu peux toujours en changer au moment de payer.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AddressCard({ address }: { address: Address }) {
  const { colors } = useTheme();
  const Icon = KIND_ICON[address.kind];
  return (
    <View
      style={{
        padding: 14,
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: address.primary ? 1.5 : 1,
        borderColor: address.primary ? colors.primary : colors.border,
        flexDirection: 'row',
        gap: 14,
        alignItems: 'flex-start',
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: address.primary ? colors.primarySoft : colors.bgSunken,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          size={18}
          color={address.primary ? colors.primary : colors.text}
          strokeWidth={1.75}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text
            style={{
              fontSize: 14.5,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: 0,
              lineHeight: 18,
              includeFontPadding: false,
            }}
          >
            {address.label}
          </Text>
          {address.primary && (
            <View
              style={{
                paddingHorizontal: 8,
                height: 20,
                borderRadius: 999,
                backgroundColor: colors.primarySoft,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 3,
              }}
            >
              <Check size={9} color={colors.primaryDeep} strokeWidth={3} />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '700',
                  color: colors.primaryDeep,
                  lineHeight: 12,
                  includeFontPadding: false,
                  letterSpacing: 0.3,
                }}
              >
                PRINCIPAL
              </Text>
            </View>
          )}
        </View>
        <Text
          style={{
            fontSize: 13,
            color: colors.text,
            marginTop: 4,
            letterSpacing: 0,
            lineHeight: 18,
          }}
        >
          {address.street}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
            marginTop: 2,
            letterSpacing: 0,
            lineHeight: 16,
          }}
        >
          {address.district}, {address.city}
        </Text>
      </View>
      <Pressable
        hitSlop={6}
        style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}
      >
        <MoreVertical size={16} color={colors.textMuted} strokeWidth={1.75} />
      </Pressable>
    </View>
  );
}
