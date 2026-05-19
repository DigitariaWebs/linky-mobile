import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button, IconButton } from '../../src/components/primitives/Button';
import { TopBar } from '../../src/components/nav/TopBar';
import { WalletGlanceCard } from '../../src/components/lists/WalletCard';
import { I } from '../../src/icons/Icon';
import { formatGNF } from '../../src/lib/format';
import { useWallet } from '../../src/data/queries';
import { Skeleton } from '../../src/components/primitives/Skeleton';

const STATUS_LABEL: Record<string, string> = {
  received: 'Reçu',
  escrow: 'En séquestre',
  completed: 'Effectué',
  pending: 'En attente',
};

export default function WalletRoute() {
  const { colors } = useTheme();
  const { data: wallet, isLoading } = useWallet();
  const [tab, setTab] = useState<'movements' | 'pending'>('movements');

  if (isLoading || !wallet) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
        <TopBar title="Mon portefeuille" back />
        <View style={{ padding: 16, gap: 12 }}>
          <Skeleton height={160} radius={16} />
          <Skeleton height={16} />
          <Skeleton height={16} />
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = (s: string) =>
    s === 'received' ? colors.success : s === 'escrow' ? colors.info : colors.textMuted;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar
        title="Mon portefeuille"
        back
        right={
          <IconButton variant="secondary" size={36}>
            <I.qr size={16} color={colors.text} />
          </IconButton>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <WalletGlanceCard
            balanceGnf={wallet.balanceGnf}
            large
            onRecharger={() => router.push('/wallet/recharger')}
            onRetirer={() => router.push('/wallet/retirer')}
          />
        </View>

        <View style={{ marginTop: 18, paddingHorizontal: 16, flexDirection: 'row', gap: 18, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          {(['movements', 'pending'] as const).map((t) => {
            const active = tab === t;
            return (
              <Pressable key={t} onPress={() => setTab(t)} style={{ paddingBottom: 12, borderBottomWidth: active ? 2 : 0, borderBottomColor: colors.primary }}>
                <Text style={{ fontSize: 13, fontWeight: active ? '600' : '400', color: active ? colors.text : colors.textMuted }}>
                  {t === 'movements' ? 'Mouvements' : 'Retraits en attente'}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
          {wallet.movements.map((m) => (
            <View
              key={m.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: m.direction === 'in' ? colors.primarySoft : colors.bgSunken,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {m.direction === 'in' ? (
                  <I.download size={16} color={colors.primary} />
                ) : (
                  <I.upload size={16} color={colors.text} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '600' }}>{m.label}</Text>
                <Text variant="micro" tone="muted" style={{ letterSpacing: 0, textTransform: 'none' }}>
                  {new Date(m.date).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  {' · '}
                  <Text style={{ color: statusColor(m.status) }}>{STATUS_LABEL[m.status]}</Text>
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                  fontVariant: ['tabular-nums'],
                  color: m.amountGnf > 0 ? colors.success : colors.text,
                }}
              >
                {m.amountGnf > 0 ? '+' : ''}
                {formatGNF(m.amountGnf)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
