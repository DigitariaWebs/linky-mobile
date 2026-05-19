import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Check, X, MessageCircle, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockOrders } from '../../../src/data/mockOrders';
import { formatGNF } from '../../../src/lib/format';

export default function RefundDetailRoute() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = mockOrders[0]!;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <ScreenHeader title="Demande de remboursement" />

        {/* Reason banner */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 16,
              borderRadius: 18,
              backgroundColor: 'rgba(209,79,60,0.08)',
              borderWidth: 1,
              borderColor: 'rgba(209,79,60,0.25)',
              flexDirection: 'row',
              gap: 12,
              alignItems: 'flex-start',
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                backgroundColor: 'rgba(209,79,60,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={16} color={colors.danger} strokeWidth={2} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 13.5,
                  fontWeight: '700',
                  color: colors.danger,
                  letterSpacing: 0,
                  lineHeight: 17,
                  includeFontPadding: false,
                }}
              >
                Motif : Article différent de la photo
              </Text>
              <Text
                style={{
                  fontSize: 12.5,
                  color: colors.danger,
                  marginTop: 4,
                  opacity: 0.8,
                  letterSpacing: 0,
                  lineHeight: 17,
                }}
              >
                "Le flacon reçu n'est pas le même que sur la photo. Le packaging est aussi différent."
              </Text>
            </View>
          </View>
        </View>

        {/* Order */}
        <View style={{ paddingHorizontal: 24, paddingTop: 18 }}>
          <View
            style={{
              padding: 14,
              borderRadius: 18,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <Image
              source={order.productSnapshot.photo}
              style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: colors.bgSunken }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textFaint, letterSpacing: 0.5 }}>
                {order.reference}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.text,
                  marginTop: 2,
                  letterSpacing: 0,
                  lineHeight: 18,
                  includeFontPadding: false,
                }}
                numberOfLines={2}
              >
                {order.productSnapshot.title}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '700',
                  color: colors.text,
                  marginTop: 4,
                  fontVariant: ['tabular-nums'],
                }}
              >
                {formatGNF(order.totalGnf)}
              </Text>
            </View>
          </View>
        </View>

        {/* Buyer's photos placeholder */}
        <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: colors.textFaint,
              letterSpacing: 0.6,
              marginBottom: 10,
            }}
          >
            PHOTOS DE L'ACHETEUR
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 14,
                  backgroundColor: colors.bgSunken,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 11, color: colors.textFaint }}>Photo {i}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Decision bar */}
      <SafeAreaView
        edges={['bottom']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 8,
          backgroundColor: colors.bg,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => haptic.light()}
          style={{
            width: 56,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MessageCircle size={18} color={colors.text} strokeWidth={2} />
        </Pressable>
        <Pressable
          onPress={() => {
            haptic.medium();
            router.back();
          }}
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            backgroundColor: 'rgba(209,79,60,0.08)',
            borderWidth: 1,
            borderColor: 'rgba(209,79,60,0.25)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <X size={14} color={colors.danger} strokeWidth={2.25} />
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: colors.danger,
              lineHeight: 16,
              includeFontPadding: false,
            }}
          >
            Refuser
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            haptic.medium();
            router.back();
          }}
          style={{
            flex: 1.4,
            height: 52,
            borderRadius: 16,
            backgroundColor: colors.text,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Check size={14} color={colors.bg} strokeWidth={2.5} />
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: colors.bg,
              lineHeight: 16,
              includeFontPadding: false,
            }}
          >
            Rembourser
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}
