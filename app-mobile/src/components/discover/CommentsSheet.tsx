import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { Heart, Send } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../primitives/Text';
import { haptic } from '../../lib/haptics';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  ago: string;
  likes: number;
  liked?: boolean;
}

// Deterministic mock comments. Keyed by item id so each post gets a different feed.
function generateComments(seed: string): Comment[] {
  const avatars = [
    'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=200&q=70',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=70',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70',
    'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=200&q=70',
    'https://images.unsplash.com/photo-1592621385612-4d7129426394?w=200&q=70',
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=70',
  ];
  const names = [
    'Aïssatou D.',
    'Mamadou B.',
    'Fatou C.',
    'Ibrahima S.',
    'Mariama D.',
    'Ousmane T.',
    'Kadiatou B.',
    'Sékou C.',
  ];
  const texts = [
    'C\'est encore disponible ?',
    'Magnifique 😍 Le prix est négociable ?',
    'Vous livrez à Kindia ?',
    'Possible une visite ce week-end ?',
    'Très belle annonce, merci.',
    'Quelles sont les charges incluses ?',
    'Je suis intéressée, j\'envoie un message.',
    'Le voisinage est calme ?',
    'Bravo pour la qualité des photos !',
  ];
  const agos = ['2 min', '14 min', '1 h', '3 h', '6 h', 'Hier', 'Il y a 2 j'];

  // Cheap stable hash
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const out: Comment[] = [];
  const count = 6 + (h % 7);
  for (let i = 0; i < count; i++) {
    const off = (h + i * 2654435761) >>> 0;
    out.push({
      id: `${seed}-c-${i}`,
      author: names[off % names.length]!,
      avatar: avatars[(off >> 3) % avatars.length]!,
      text: texts[(off >> 5) % texts.length]!,
      ago: agos[(off >> 7) % agos.length]!,
      likes: (off >> 11) % 64,
    });
  }
  return out;
}

export const CommentsSheet = forwardRef<BottomSheetModal, { itemId: string }>(function CommentsSheet(
  { itemId },
  ref,
) {
  const { colors, radii } = useTheme();
  const insets = useSafeAreaInsets();
  const snaps = useMemo(() => ['60%', '92%'], []);
  const [draft, setDraft] = useState('');
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const comments = useMemo(() => generateComments(itemId), [itemId]);

  const renderBackdrop = useCallback(
    (p: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...p}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const toggleLike = (id: string) => {
    haptic.selection();
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snaps}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: colors.borderStrong, width: 44, height: 4 }}
      backgroundStyle={{
        backgroundColor: colors.card,
        borderTopLeftRadius: radii.xl,
        borderTopRightRadius: radii.xl,
      }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 6,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: 0,
            lineHeight: 18,
            includeFontPadding: false,
          }}
        >
          {comments.length} commentaires
        </Text>
      </View>

      {/* Comments list */}
      <BottomSheetScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: 24,
          gap: 18,
        }}
        showsVerticalScrollIndicator={false}
      >
        {comments.map((c) => {
          const isLiked = liked.has(c.id);
          const likeCount = c.likes + (isLiked ? 1 : 0);
          return (
            <View key={c.id} style={{ flexDirection: 'row', gap: 12 }}>
              <Image
                source={c.avatar}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: colors.bgSunken,
                }}
                contentFit="cover"
              />
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13.5,
                      fontWeight: '700',
                      color: colors.text,
                      letterSpacing: 0,
                      lineHeight: 16,
                      includeFontPadding: false,
                    }}
                  >
                    {c.author}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11.5,
                      color: colors.textFaint,
                      letterSpacing: 0,
                    }}
                  >
                    · {c.ago}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.text,
                    marginTop: 4,
                    lineHeight: 20,
                    letterSpacing: 0,
                  }}
                >
                  {c.text}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    marginTop: 6,
                  }}
                >
                  <Pressable hitSlop={6}>
                    <Text
                      style={{
                        fontSize: 11.5,
                        fontWeight: '700',
                        color: colors.textMuted,
                        letterSpacing: 0.2,
                      }}
                    >
                      Répondre
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Pressable
                onPress={() => toggleLike(c.id)}
                hitSlop={6}
                style={{ alignItems: 'center', justifyContent: 'flex-start', gap: 2, width: 28 }}
              >
                <Heart
                  size={16}
                  color={isLiked ? colors.danger : colors.textMuted}
                  fill={isLiked ? colors.danger : 'transparent'}
                  strokeWidth={isLiked ? 0 : 2}
                />
                {likeCount > 0 && (
                  <Text
                    style={{
                      fontSize: 10.5,
                      fontWeight: '700',
                      color: colors.textMuted,
                      fontVariant: ['tabular-nums'],
                      letterSpacing: 0,
                    }}
                  >
                    {likeCount}
                  </Text>
                )}
              </Pressable>
            </View>
          );
        })}
      </BottomSheetScrollView>

      {/* Composer */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 12),
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.card,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Image
          source="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=70"
          style={{ width: 34, height: 34, borderRadius: 999, backgroundColor: colors.bgSunken }}
          contentFit="cover"
        />
        <View
          style={{
            flex: 1,
            height: 42,
            paddingHorizontal: 14,
            borderRadius: 999,
            backgroundColor: colors.bgSunken,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Écris un commentaire…"
            placeholderTextColor={colors.textFaint}
            style={{
              flex: 1,
              fontSize: 14,
              color: colors.text,
              padding: 0,
              letterSpacing: 0,
            }}
          />
        </View>
        <Pressable
          onPress={() => {
            if (!draft.trim()) return;
            haptic.light();
            setDraft('');
          }}
          disabled={!draft.trim()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: draft.trim() ? colors.primary : colors.bgSunken,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: draft.trim() ? 1 : 0.6,
          }}
        >
          <Send
            size={16}
            color={draft.trim() ? '#FFFFFF' : colors.textFaint}
            strokeWidth={2}
          />
        </Pressable>
      </View>
    </BottomSheetModal>
  );
});
