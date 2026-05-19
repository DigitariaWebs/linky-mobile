import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useTheme } from '../src/theme/ThemeProvider';
import { Text } from '../src/components/primitives/Text';
import { Card } from '../src/components/primitives/Card';
import { Button } from '../src/components/primitives/Button';
import { TopBar } from '../src/components/nav/TopBar';
import { StickyBottom } from '../src/components/nav/StickyBottom';
import { EmptyState } from '../src/components/feedback/EmptyState';
import { I } from '../src/icons/Icon';
import { formatGNF, formatEUR } from '../src/lib/format';
import { gnfToEur } from '../src/lib/currency';
import { useCart } from '../src/stores/cart';
import { getProduct } from '../src/data/mockProducts';
import { haptic } from '../src/lib/haptics';

export default function CartRoute() {
  const { colors, radii } = useTheme();
  const { lines, setQuantity, remove } = useCart();

  const items = lines
    .map((l) => ({ line: l, product: getProduct(l.productId) }))
    .filter((x): x is { line: typeof lines[0]; product: NonNullable<ReturnType<typeof getProduct>> } => !!x.product);
  const subtotal = items.reduce((sum, { line, product }) => sum + product.priceGnf * line.quantity, 0);
  const fees = Math.round(subtotal * 0.03);
  const total = subtotal + fees;
  const sellers = Array.from(new Set(items.map((i) => i.product.shopId))).length;

  if (items.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
        <TopBar title="Mon panier" back />
        <EmptyState
          icon="cart"
          title="Ton panier est vide"
          description="Découvre des milliers d'articles et de boutiques de confiance"
          ctaLabel="Aller au marché"
          onCta={() => router.push('/(tabs)/marche')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <TopBar
        title="Mon panier"
        back
        subtitle={`${items.length} article${items.length > 1 ? 's' : ''} · ${sellers} vendeur${sellers > 1 ? 's' : ''}`}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 120, gap: 10 }}>
        {items.map(({ line, product }) => (
          <Card key={product.id} padding={10}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Image
                source={product.photos[0]}
                style={{ width: 72, height: 72, borderRadius: 10, backgroundColor: colors.bgSunken }}
                contentFit="cover"
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: '500', lineHeight: 17 }} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text variant="micro" tone="muted" style={{ marginTop: 3, letterSpacing: 0, textTransform: 'none' }}>
                  {product.shopId.replace('s_', '').replace(/_/g, ' ')}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                  <Text style={{ fontWeight: '600', fontSize: 14, fontVariant: ['tabular-nums'] }}>
                    {formatGNF(product.priceGnf)}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.bgSunken,
                      borderRadius: 999,
                      padding: 2,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        haptic.light();
                        if (line.quantity === 1) remove(product.id);
                        else setQuantity(product.id, line.quantity - 1);
                      }}
                      hitSlop={6}
                      style={{ width: 26, height: 26, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <I.minus size={13} color={colors.textMuted} />
                    </Pressable>
                    <Text style={{ minWidth: 22, textAlign: 'center', fontWeight: '600', fontSize: 13 }}>
                      {line.quantity}
                    </Text>
                    <Pressable
                      onPress={() => {
                        haptic.light();
                        setQuantity(product.id, line.quantity + 1);
                      }}
                      hitSlop={6}
                      style={{
                        width: 26,
                        height: 26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.card,
                        borderRadius: 999,
                      }}
                    >
                      <I.plus size={13} color={colors.text} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        ))}

        <Card padding={12}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <I.bolt size={18} color={colors.accent} />
            <Text style={{ flex: 1, fontSize: 13, fontWeight: '500' }}>Code promo</Text>
            <I.chevronD size={16} color={colors.textMuted} />
          </View>
        </Card>

        <Card padding={14}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text variant="caption" tone="muted" style={{ letterSpacing: 0 }}>
              Sous-total
            </Text>
            <Text style={{ fontVariant: ['tabular-nums'] }}>{formatGNF(subtotal)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text variant="caption" tone="muted" style={{ letterSpacing: 0 }}>
              Frais Linky <Text style={{ color: colors.primary }}>(3%)</Text>
            </Text>
            <Text style={{ fontVariant: ['tabular-nums'] }}>{formatGNF(fees)}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 10 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 13, fontWeight: '600' }}>Total</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: '700', fontSize: 18, fontVariant: ['tabular-nums'] }}>
                {formatGNF(total)}
              </Text>
              <Text variant="micro" tone="muted" style={{ letterSpacing: 0 }}>
                {formatEUR(gnfToEur(total))}
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>

      <StickyBottom>
        <Button size="lg" block label="Passer au paiement" onPress={() => router.push('/checkout')} />
      </StickyBottom>
    </SafeAreaView>
  );
}
