import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Camera, Plus, Trash2, Star } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { photos } from '../../../src/data/photos';

const SAMPLE = [photos.apartment1, photos.livingRoom, photos.apartment2, photos.modernHouse];

export default function PropertyPhotosRoute() {
  const { colors } = useTheme();
  const [imgs, setImgs] = useState<string[]>(SAMPLE.slice(0, 3));
  const valid = imgs.length >= 3;

  const removeAt = (i: number) => {
    haptic.light();
    setImgs((p) => p.filter((_, idx) => idx !== i));
  };

  const addOne = () => {
    haptic.light();
    setImgs((p) => [...p, SAMPLE[p.length % SAMPLE.length]!]);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ScreenHeader
          title="Ajoute des photos"
          subtitle="Au moins 3 photos, la première sert de couverture."
        />

        {/* Cover slot */}
        {imgs[0] && (
          <View style={{ paddingHorizontal: 24, marginBottom: 14 }}>
            <View
              style={{
                height: 240,
                borderRadius: 22,
                overflow: 'hidden',
                backgroundColor: colors.bgSunken,
                position: 'relative',
              }}
            >
              <Image source={imgs[0]} style={{ flex: 1 }} contentFit="cover" />
              <View
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  paddingHorizontal: 10,
                  height: 26,
                  borderRadius: 999,
                  backgroundColor: colors.accent,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Star size={11} color="#2A1A05" fill="#2A1A05" />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: '#2A1A05',
                    lineHeight: 13,
                    includeFontPadding: false,
                    letterSpacing: 0.3,
                  }}
                >
                  COUVERTURE
                </Text>
              </View>
              <Pressable
                onPress={() => removeAt(0)}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trash2 size={15} color="#FFFFFF" strokeWidth={2} />
              </Pressable>
            </View>
          </View>
        )}

        {/* Thumbnails grid */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {imgs.slice(1).map((src, i) => (
            <View
              key={i}
              style={{
                width: '47%',
                aspectRatio: 1,
                borderRadius: 14,
                overflow: 'hidden',
                backgroundColor: colors.bgSunken,
                position: 'relative',
              }}
            >
              <Image source={src} style={{ flex: 1 }} contentFit="cover" />
              <Pressable
                onPress={() => removeAt(i + 1)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  backgroundColor: 'rgba(0,0,0,0.55)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Trash2 size={12} color="#FFFFFF" strokeWidth={2} />
              </Pressable>
            </View>
          ))}

          {/* Add tile */}
          <Pressable
            onPress={addOne}
            style={{
              width: '47%',
              aspectRatio: 1,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: colors.border,
              borderStyle: 'dashed',
              backgroundColor: colors.card,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Plus size={22} color={colors.text} strokeWidth={2} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: colors.text,
                letterSpacing: 0,
              }}
            >
              Ajouter
            </Text>
          </Pressable>
        </View>

        {/* Tip */}
        <View style={{ paddingHorizontal: 24, paddingTop: 22 }}>
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
            <Camera size={14} color={colors.primary} strokeWidth={2} style={{ marginTop: 1 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 12.5,
                color: colors.textMuted,
                lineHeight: 18,
                letterSpacing: 0,
              }}
            >
              Photos prises de jour, sans flash, qui montrent toutes les pièces. Pas de filtres
              trompeurs.
            </Text>
          </View>
        </View>
      </ScrollView>

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
            router.push('/create/property/amenities');
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
            Continuer · {imgs.length} photo{imgs.length > 1 ? 's' : ''}
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}
