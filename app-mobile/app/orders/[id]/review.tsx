import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockOrders } from '../../../src/data/mockOrders';

const QUICK_TAGS = [
  'Conforme à la photo',
  'Livraison rapide',
  'Bon emballage',
  'Vendeur réactif',
  'Comme neuf',
  'Très bon rapport qualité/prix',
];

export default function ReviewRoute() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = mockOrders.find((o) => o.id === id) ?? mockOrders[0]!;
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [comment, setComment] = useState('');

  const valid = rating > 0;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ScreenHeader title="Note ton achat" subtitle="Ton avis aide les autres acheteurs." />

        {/* Product preview */}
        <View style={{ paddingHorizontal: 24 }}>
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
              style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bgSunken }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.text,
                  letterSpacing: 0,
                  lineHeight: 18,
                  includeFontPadding: false,
                }}
                numberOfLines={2}
              >
                {order.productSnapshot.title}
              </Text>
            </View>
          </View>
        </View>

        {/* Stars */}
        <View style={{ paddingHorizontal: 24, paddingTop: 26, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: colors.textFaint,
              letterSpacing: 0.5,
              marginBottom: 14,
            }}
          >
            COMMENT C'ÉTAIT ?
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable
                key={n}
                onPress={() => {
                  haptic.selection();
                  setRating(n);
                }}
                hitSlop={4}
              >
                <Star
                  size={42}
                  color={n <= rating ? colors.accent : colors.border}
                  fill={n <= rating ? colors.accent : 'transparent'}
                  strokeWidth={1.5}
                />
              </Pressable>
            ))}
          </View>
          <Text
            style={{
              fontSize: 13,
              color: colors.textMuted,
              marginTop: 14,
              letterSpacing: 0,
            }}
          >
            {rating === 0
              ? 'Touche les étoiles'
              : rating === 5
                ? 'Excellent ! 🤩'
                : rating === 4
                  ? 'Très bien'
                  : rating === 3
                    ? 'Correct'
                    : rating === 2
                      ? 'Décevant'
                      : 'Mauvais'}
          </Text>
        </View>

        {/* Quick tags */}
        <View style={{ paddingHorizontal: 24, paddingTop: 26 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: colors.textFaint,
              letterSpacing: 0.6,
              marginBottom: 10,
            }}
          >
            CE QUI T'A PLU
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {QUICK_TAGS.map((t) => {
              const on = tags.has(t);
              return (
                <Pressable
                  key={t}
                  onPress={() => {
                    haptic.selection();
                    setTags((prev) => {
                      const next = new Set(prev);
                      if (next.has(t)) next.delete(t);
                      else next.add(t);
                      return next;
                    });
                  }}
                  style={{
                    paddingHorizontal: 12,
                    height: 36,
                    borderRadius: 999,
                    backgroundColor: on ? colors.text : colors.card,
                    borderWidth: 1,
                    borderColor: on ? colors.text : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12.5,
                      fontWeight: '600',
                      color: on ? colors.bg : colors.text,
                      letterSpacing: 0,
                      lineHeight: 15,
                      includeFontPadding: false,
                    }}
                  >
                    {t}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Comment */}
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
            COMMENTAIRE · OPTIONNEL
          </Text>
          <View
            style={{
              minHeight: 120,
              padding: 14,
              borderRadius: 16,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Raconte ton expérience…"
              placeholderTextColor={colors.textFaint}
              multiline
              textAlignVertical="top"
              style={{
                flex: 1,
                fontSize: 14,
                color: colors.text,
                lineHeight: 20,
                letterSpacing: 0,
                padding: 0,
                minHeight: 92,
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Submit */}
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
          disabled={!valid}
          onPress={() => {
            haptic.medium();
            router.replace('/orders');
          }}
          style={{
            height: 56,
            borderRadius: 16,
            backgroundColor: valid ? colors.text : colors.bgSunken,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: valid ? 1 : 0.6,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: valid ? colors.bg : colors.textFaint,
              lineHeight: 18,
              includeFontPadding: false,
            }}
          >
            Publier mon avis
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}
