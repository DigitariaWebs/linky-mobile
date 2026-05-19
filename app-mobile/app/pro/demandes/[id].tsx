import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Check, X, Send } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { photos } from '../../../src/data/photos';
import { mockProperties } from '../../../src/data/mockProperties';
import { formatGNF } from '../../../src/lib/format';

interface Msg {
  id: string;
  from: 'me' | 'client';
  text: string;
  time: string;
}

const MESSAGES: Msg[] = [
  {
    id: 'm1',
    from: 'client',
    text: 'Bonjour, votre annonce m\'intéresse beaucoup. Je propose 3 800 000 GNF/mois pour 6 mois de bail.',
    time: '10:42',
  },
  {
    id: 'm2',
    from: 'client',
    text: 'Je peux fournir une caution de 2 mois immédiatement.',
    time: '10:43',
  },
  {
    id: 'm3',
    from: 'me',
    text: 'Bonjour Mariama, merci pour votre intérêt. Le tarif minimum est de 4 000 000 GNF/mois. Une visite est possible cette semaine.',
    time: '11:14',
  },
];

export default function DemandDetailRoute() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [draft, setDraft] = useState('');
  const property = mockProperties[0]!;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Demande" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        style={{ flex: 1 }}
      >
        {/* Client header */}
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
              source={photos.woman1}
              style={{ width: 44, height: 44, borderRadius: 999, backgroundColor: colors.bgSunken }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14.5,
                  fontWeight: '700',
                  color: colors.text,
                  letterSpacing: 0,
                  lineHeight: 18,
                  includeFontPadding: false,
                }}
              >
                Mariama Diallo
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.textMuted,
                  marginTop: 2,
                  letterSpacing: 0,
                  fontVariant: ['tabular-nums'],
                }}
              >
                Membre depuis 2024 · 4 transactions
              </Text>
            </View>
          </View>
        </View>

        {/* Offer summary */}
        <View style={{ paddingHorizontal: 24, marginTop: 14 }}>
          <View
            style={{
              padding: 14,
              borderRadius: 18,
              backgroundColor: colors.accentSoft,
              borderWidth: 1,
              borderColor: 'rgba(232,165,61,0.25)',
              flexDirection: 'row',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <Image
              source={property.photos[0]}
              style={{ width: 52, height: 52, borderRadius: 12, backgroundColor: colors.bgSunken }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: colors.accentText,
                  letterSpacing: 0.5,
                }}
              >
                OFFRE REÇUE
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.accentText,
                  marginTop: 1,
                  letterSpacing: 0,
                  lineHeight: 17,
                }}
                numberOfLines={1}
              >
                {property.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.accentText,
                  marginTop: 4,
                  fontVariant: ['tabular-nums'],
                  letterSpacing: -0.3,
                }}
              >
                3 800 000 GNF{' '}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: colors.accentText,
                    opacity: 0.7,
                  }}
                >
                  · listé à {formatGNF(property.priceGnf)}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <View
          style={{ paddingHorizontal: 24, marginTop: 14, flexDirection: 'row', gap: 10 }}
        >
          <Pressable
            onPress={() => haptic.medium()}
            style={{
              flex: 1,
              height: 46,
              borderRadius: 14,
              backgroundColor: colors.text,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Check size={14} color={colors.bg} strokeWidth={2.25} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                color: colors.bg,
                lineHeight: 16,
                includeFontPadding: false,
              }}
            >
              Accepter
            </Text>
          </Pressable>
          <Pressable
            onPress={() => haptic.light()}
            style={{
              flex: 1,
              height: 46,
              borderRadius: 14,
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
        </View>

        {/* Conversation */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 22,
            gap: 10,
          }}
        >
          {MESSAGES.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
        </View>
      </ScrollView>

      {/* Composer */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 12),
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.bg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 44,
            paddingHorizontal: 14,
            borderRadius: 999,
            backgroundColor: colors.bgSunken,
            justifyContent: 'center',
          }}
        >
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Réponds à Mariama…"
            placeholderTextColor={colors.textFaint}
            style={{
              fontSize: 14,
              color: colors.text,
              padding: 0,
              letterSpacing: 0,
            }}
          />
        </View>
        <Pressable
          disabled={!draft.trim()}
          onPress={() => {
            haptic.light();
            setDraft('');
          }}
          style={{
            width: 44,
            height: 44,
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
    </SafeAreaView>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const { colors } = useTheme();
  const isMe = msg.from === 'me';
  return (
    <View
      style={{
        maxWidth: '80%',
        alignSelf: isMe ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: 18,
          borderTopLeftRadius: isMe ? 18 : 4,
          borderTopRightRadius: isMe ? 4 : 18,
          backgroundColor: isMe ? colors.text : colors.card,
          borderWidth: isMe ? 0 : 1,
          borderColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: 13.5,
            color: isMe ? colors.bg : colors.text,
            lineHeight: 19,
            letterSpacing: 0,
          }}
        >
          {msg.text}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 10.5,
          color: colors.textFaint,
          marginTop: 4,
          paddingHorizontal: 8,
          textAlign: isMe ? 'right' : 'left',
        }}
      >
        {msg.time}
      </Text>
    </View>
  );
}
