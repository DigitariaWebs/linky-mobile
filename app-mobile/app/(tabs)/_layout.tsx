import { Tabs } from 'expo-router';
import { BottomTabBar } from '../../src/components/nav/BottomTabBar';
import { useAuth } from '../../src/stores/auth';

export default function TabsLayout() {
  const roles = useAuth((s) => s.roles);
  const isBuyer = roles.includes('buyer');
  const isSeller = roles.includes('seller');
  const isAgent = roles.includes('agent');
  const isPro = isSeller || isAgent;
  // Pure pros have the dashboard on Home — no separate Boutique tab.
  // Mixed users (buyer + pro) keep the Boutique tab so they can reach the dashboard.
  const showBoutique = isPro && isBuyer;

  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="marche" options={{ title: 'Marché' }} />
      <Tabs.Screen name="decouvrir" options={{ title: 'Découvrir' }} />
      <Tabs.Screen
        name="boutique"
        options={{
          title: isAgent && !isSeller ? 'Immobilier' : 'Boutique',
          href: showBoutique ? undefined : null,
        }}
      />
      <Tabs.Screen name="profil" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
