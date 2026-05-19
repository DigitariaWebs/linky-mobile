import { ScrollView, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import {
  ChevronRight,
  MapPin,
  Phone,
  Bell,
  Globe2,
  Sparkles as SparklesIcon,
  CloudOff,
  Eye,
  Info,
  MessageCircle,
  FileText,
  ShieldCheck,
  Shield,
  LogOut,
  Package,
  CalendarDays,
  ListOrdered,
  Heart,
  Wallet,
  Pencil,
  ShoppingBag,
  Store,
  Building2,
  Bug,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Switch } from '../../src/components/primitives/Switch';
import { haptic } from '../../src/lib/haptics';
import { useAuth } from '../../src/stores/auth';
import { usePrefs } from '../../src/stores/prefs';

interface QuickAction {
  Icon: LucideIcon;
  label: string;
  badge?: string;
  href?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { Icon: Package, label: 'Commandes', badge: '3', href: '/orders' },
  { Icon: CalendarDays, label: 'Demandes', href: '/buyer/requests' },
  { Icon: Heart, label: 'Favoris', badge: '8', href: '/favorites' },
  { Icon: Wallet, label: 'Wallet', href: '/wallet' },
  { Icon: ShieldCheck, label: 'KYC', href: '/kyc/intro' },
];

export default function ProfilRoute() {
  const { colors } = useTheme();
  const user = useAuth((s) => s.user);
  const signOut = useAuth((s) => s.signOut);
  const { dataSaver, setDataSaver, notifications, setNotifications } = usePrefs();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ===== Title ===== */}
        <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 18 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: colors.text,
              letterSpacing: -0.5,
              lineHeight: 38,
            }}
          >
            Profil
          </Text>
        </View>

        {/* ===== Profile card ===== */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 16,
              borderRadius: 22,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <View style={{ position: 'relative' }}>
              <Image
                source={user?.photo}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 999,
                  backgroundColor: colors.bgSunken,
                }}
                contentFit="cover"
              />
              {user?.kycVerified && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 3,
                    borderColor: colors.card,
                  }}
                >
                  <ShieldCheck size={11} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.text,
                  letterSpacing: -0.2,
                  lineHeight: 22,
                  includeFontPadding: false,
                }}
                numberOfLines={1}
              >
                {user?.name ?? 'Linky'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 4,
                }}
              >
                <MapPin size={11} color={colors.textMuted} strokeWidth={2} />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.textMuted,
                    letterSpacing: 0,
                  }}
                  numberOfLines={1}
                >
                  {user?.city ?? 'Conakry'}
                  {user?.kycVerified ? ' · Vérifiée' : ''}
                </Text>
              </View>
              <Pressable
                hitSlop={6}
                style={{
                  marginTop: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  alignSelf: 'flex-start',
                }}
              >
                <Pencil size={11} color={colors.primary} strokeWidth={2.25} />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: colors.primary,
                    letterSpacing: 0,
                  }}
                >
                  Modifier mon profil
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ===== Quick actions ===== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 16,
            gap: 8,
          }}
        >
          {QUICK_ACTIONS.map((a) => (
            <Pressable
              key={a.label}
              onPress={() => {
                haptic.light();
                if (a.href) router.push(a.href as never);
              }}
              style={{
                height: 40,
                paddingHorizontal: 14,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <a.Icon size={15} color={colors.text} strokeWidth={1.75} />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: colors.text,
                  letterSpacing: 0,
                  lineHeight: 16,
                  includeFontPadding: false,
                }}
              >
                {a.label}
              </Text>
              {a.badge && (
                <View
                  style={{
                    minWidth: 18,
                    height: 18,
                    paddingHorizontal: 5,
                    borderRadius: 999,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 10,
                      fontWeight: '700',
                      lineHeight: 12,
                      includeFontPadding: false,
                    }}
                  >
                    {a.badge}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>

        {/* ===== Réglages section ===== */}
        <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
          <SectionLabel label="Réglages" />
          <SettingsCard>
            <Row
              Icon={Phone}
              label="Numéros de téléphone"
              sub="2 numéros liés"
              onPress={() => router.push('/settings/phones')}
            />
            <Row
              Icon={MapPin}
              label="Adresses"
              value="Kaloum"
              onPress={() => router.push('/settings/addresses')}
            />
            <Row
              Icon={ShieldCheck}
              label="Vérification d'identité"
              right={
                <View
                  style={{
                    paddingHorizontal: 10,
                    height: 24,
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
                      letterSpacing: 0.3,
                      lineHeight: 12,
                      includeFontPadding: false,
                    }}
                  >
                    VÉRIFIÉE
                  </Text>
                </View>
              }
            />
            <Row
              Icon={Bell}
              label="Notifications"
              right={<Switch value={notifications} onChange={setNotifications} />}
            />
            <Row
              Icon={Globe2}
              label="Langue"
              value="Français"
              onPress={() => router.push('/settings')}
            />
            <Row
              Icon={SparklesIcon}
              label="Thème"
              value="Système"
              onPress={() => router.push('/settings/theme')}
            />
            <Row
              Icon={CloudOff}
              label="Mode économie de données"
              sub="Désactive l'autoplay, baisse la qualité"
              right={<Switch value={dataSaver} onChange={setDataSaver} />}
            />
            <Row
              Icon={Eye}
              label="Confidentialité"
              onPress={() => router.push('/settings/privacy')}
              divider={false}
            />
          </SettingsCard>
        </View>

        {/* ===== À propos ===== */}
        <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
          <SectionLabel label="À propos" />
          <SettingsCard>
            <Row
              Icon={Info}
              label="À propos de Linky"
              value="v0.1.0"
              onPress={() => router.push('/settings/about')}
            />
            <Row
              Icon={MessageCircle}
              label="Aide & support"
              onPress={() => router.push('/settings/help')}
            />
            <Row
              Icon={FileText}
              label="Conditions générales"
              onPress={() => router.push('/settings/terms')}
            />
            <Row
              Icon={Shield}
              label="Politique de confidentialité"
              onPress={() => router.push('/settings/privacy-policy')}
              divider={false}
            />
          </SettingsCard>
        </View>

        {/* ===== Dev: role debug ===== */}
        {__DEV__ && <RoleDebug />}

        {/* ===== Logout ===== */}
        <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
          <Pressable
            onPress={() => {
              haptic.light();
              signOut();
              router.replace('/(onboarding)/welcome');
            }}
            style={{
              height: 52,
              borderRadius: 16,
              backgroundColor: 'rgba(209,79,60,0.08)',
              borderWidth: 1,
              borderColor: 'rgba(209,79,60,0.25)',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <LogOut size={16} color={colors.danger} strokeWidth={2} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.danger,
                letterSpacing: 0,
                lineHeight: 17,
                includeFontPadding: false,
              }}
            >
              Déconnexion
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================================================
// Subcomponents
// ===================================================================

function SectionLabel({ label }: { label: string }) {
  const { colors } = useTheme();
  return (
    <Text
      style={{
        fontSize: 11,
        fontWeight: '700',
        color: colors.textFaint,
        letterSpacing: 0.6,
        marginBottom: 10,
        marginLeft: 4,
      }}
    >
      {label.toUpperCase()}
    </Text>
  );
}

function SettingsCard({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        borderRadius: 18,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  );
}

function RoleDebug() {
  const { colors } = useTheme();
  const roles = useAuth((s) => s.roles);
  const setRoles = useAuth((s) => s.setRoles);

  const toggle = (role: 'buyer' | 'seller' | 'agent') => {
    haptic.selection();
    const has = roles.includes(role);
    if (has) {
      const next = roles.filter((r) => r !== role);
      // Always keep at least one role
      setRoles(next.length > 0 ? next : ['buyer']);
    } else {
      setRoles([...roles, role]);
    }
  };

  const presets: { label: string; roles: Array<'buyer' | 'seller' | 'agent'> }[] = [
    { label: 'Buyer only', roles: ['buyer'] },
    { label: 'Seller only', roles: ['seller'] },
    { label: 'Agent only', roles: ['agent'] },
    { label: 'Buyer + Seller', roles: ['buyer', 'seller'] },
    { label: 'Buyer + Agent', roles: ['buyer', 'agent'] },
    { label: 'All three', roles: ['buyer', 'seller', 'agent'] },
  ];

  const ROLE_META = [
    { id: 'buyer' as const, label: 'Buyer', Icon: ShoppingBag },
    { id: 'seller' as const, label: 'Seller', Icon: Store },
    { id: 'agent' as const, label: 'Agent', Icon: Building2 },
  ];

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginBottom: 10,
          marginLeft: 4,
        }}
      >
        <Bug size={11} color={colors.accent} strokeWidth={2.25} />
        <Text
          style={{
            fontSize: 11,
            fontWeight: '700',
            color: colors.accent,
            letterSpacing: 0.6,
          }}
        >
          DEV · RÔLES
        </Text>
      </View>

      <View
        style={{
          borderRadius: 18,
          backgroundColor: colors.accentSoft,
          borderWidth: 1,
          borderColor: 'rgba(232,165,61,0.25)',
          overflow: 'hidden',
          padding: 14,
        }}
      >
        {/* Toggle chips */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {ROLE_META.map(({ id, label, Icon }) => {
            const on = roles.includes(id);
            return (
              <Pressable
                key={id}
                onPress={() => toggle(id)}
                style={{
                  flex: 1,
                  height: 44,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: on ? colors.accent : colors.border,
                  backgroundColor: on ? colors.accent : colors.bg,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Icon
                  size={14}
                  color={on ? '#FFFFFF' : colors.text}
                  strokeWidth={1.75}
                />
                <Text
                  style={{
                    fontSize: 12.5,
                    fontWeight: '700',
                    color: on ? '#FFFFFF' : colors.text,
                    letterSpacing: 0,
                    lineHeight: 15,
                    includeFontPadding: false,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Presets */}
        <Text
          style={{
            fontSize: 10.5,
            fontWeight: '700',
            color: colors.accentText,
            letterSpacing: 0.5,
            marginTop: 14,
            marginBottom: 8,
          }}
        >
          PRÉSETS
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {presets.map((p) => {
            const active =
              p.roles.length === roles.length &&
              p.roles.every((r) => roles.includes(r));
            return (
              <Pressable
                key={p.label}
                onPress={() => {
                  haptic.selection();
                  setRoles(p.roles);
                }}
                style={{
                  paddingHorizontal: 10,
                  height: 28,
                  borderRadius: 999,
                  backgroundColor: active ? colors.accentText : colors.bg,
                  borderWidth: 1,
                  borderColor: active ? colors.accentText : 'rgba(232,165,61,0.35)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: active ? colors.accentSoft : colors.accentText,
                    lineHeight: 13,
                    includeFontPadding: false,
                    letterSpacing: 0,
                  }}
                >
                  {p.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text
          style={{
            fontSize: 11,
            color: colors.accentText,
            marginTop: 14,
            opacity: 0.75,
            letterSpacing: 0,
            lineHeight: 16,
          }}
        >
          Visible uniquement en dev. Le changement est instantané, pas besoin de relancer
          l'onboarding.
        </Text>
      </View>
    </View>
  );
}

function Row({
  Icon,
  label,
  sub,
  value,
  right,
  onPress,
  divider = true,
}: {
  Icon: LucideIcon;
  label: string;
  sub?: string;
  value?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  divider?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderBottomWidth: divider ? 1 : 0,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          backgroundColor: colors.bgSunken,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={16} color={colors.text} strokeWidth={1.75} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 14.5,
            fontWeight: '600',
            color: colors.text,
            letterSpacing: 0,
            lineHeight: 18,
            includeFontPadding: false,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
        {sub && (
          <Text
            style={{
              fontSize: 12,
              color: colors.textMuted,
              marginTop: 2,
              letterSpacing: 0,
              lineHeight: 15,
            }}
            numberOfLines={1}
          >
            {sub}
          </Text>
        )}
      </View>

      {value && (
        <Text
          style={{
            fontSize: 13,
            color: colors.textMuted,
            letterSpacing: 0,
          }}
        >
          {value}
        </Text>
      )}
      {right}
      {!right && onPress && (
        <ChevronRight size={16} color={colors.textFaint} strokeWidth={2} />
      )}
    </Pressable>
  );
}
