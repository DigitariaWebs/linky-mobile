import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Plus, Home as HomeIcon, Building2 } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import {
  EstateDashboard,
  IdentityPill,
  ModeTab,
  ShopDashboard,
  type ProMode,
} from '../../src/components/dashboards/ProDashboard';
import { haptic } from '../../src/lib/haptics';
import { useAuth } from '../../src/stores/auth';

export default function BoutiqueRoute() {
  const { colors } = useTheme();
  const roles = useAuth((s) => s.roles);
  const isSeller = roles.includes('seller');
  const isAgent = roles.includes('agent');
  const hasBoth = isSeller && isAgent;
  const [mode, setMode] = useState<ProMode>(isSeller ? 'shop' : 'estate');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: hasBoth ? 14 : 22,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <IdentityPill mode={mode} />
          <View style={{ flex: 1 }} />
          <Pressable
            onPress={() => {
              haptic.light();
              router.push(mode === 'shop' ? '/create/product/seller' : '/create/property/details');
            }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              backgroundColor: colors.text,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityLabel={mode === 'shop' ? 'Nouvelle annonce' : 'Nouveau bien'}
          >
            <Plus size={20} color={colors.bg} strokeWidth={2.25} />
          </Pressable>
        </View>

        {hasBoth && (
          <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                padding: 4,
                borderRadius: 999,
                backgroundColor: colors.bgSunken,
              }}
            >
              <ModeTab
                Icon={HomeIcon}
                label="Boutique"
                active={mode === 'shop'}
                onPress={() => setMode('shop')}
              />
              <ModeTab
                Icon={Building2}
                label="Immobilier"
                active={mode === 'estate'}
                onPress={() => setMode('estate')}
              />
            </View>
          </View>
        )}

        {mode === 'shop' ? <ShopDashboard /> : <EstateDashboard />}
      </ScrollView>
    </SafeAreaView>
  );
}
