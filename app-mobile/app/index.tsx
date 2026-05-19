import { Redirect } from 'expo-router';
import { useAuth } from '../src/stores/auth';

// Entry point — routes to onboarding or tabs based on auth state.
export default function Index() {
  const isOnboarded = useAuth((s) => s.isOnboarded);
  if (!isOnboarded) return <Redirect href="/(onboarding)/splash" />;
  return <Redirect href="/(tabs)" />;
}
