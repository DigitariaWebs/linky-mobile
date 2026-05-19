import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { ArrowDownToLine, ArrowUpRight, Calendar } from 'lucide-react-native';
import { useTheme } from '../../../src/theme/ThemeProvider';
import { Text } from '../../../src/components/primitives/Text';
import { ScreenHeader } from '../../../src/components/nav/ScreenHeader';
import { haptic } from '../../../src/lib/haptics';
import { mockProperties } from '../../../src/data/mockProperties';
import { formatGNF } from '../../../src/lib/format';

const TERMS = [
  { id: '3m', label: '3 mois' },
  { id: '6m', label: '6 mois' },
  { id: '12m', label: '12 mois' },
  { id: '24m', label: '24 mois' },
];

export default function OfferRoute() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = mockProperties.find((p) => p.id === id) ?? mockProperties[0]!;
  const baseValue = Math.round(property.priceGnf * 0.92);
  const [offer, setOffer] = useState(String(baseValue));
  const [term, setTerm] = useState('12m');
  const [message, setMessage] = useState('');

  const value = parseInt(offer.replace(/\D/g, ''), 10) || 0;
  const delta = value - property.priceGnf;
  const deltaPct = property.priceGnf ? Math.round((delta / property.priceGnf) * 100) : 0;
  const isBelow = delta < 0;
  const valid = value > 0;

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <ScreenHeader
          title="Faire une offre"
          subtitle="Propose ton prix, l'agent peut accepter ou contre-proposer."
        />

        {/* Property */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              padding: 12,
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
              source={property.photos[0]}
              style={{ width: 60, height: 60, borderRadius: 12, backgroundColor: colors.bgSunken }}
              contentFit="cover"
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '700',
                  color: colors.textFaint,
                  letterSpacing: 0.5,
                }}
              >
                PRIX DEMANDÉ
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.text,
                  marginTop: 1,
                  fontVariant: ['tabular-nums'],
                }}
              >
                {formatGNF(property.priceGnf)}
                {property.perMonth && (
                  <Text style={{ fontSize: 12, fontWeight: '500', color: colors.textMuted }}>
                    {' '}/mois
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Offer amount */}
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
            MON OFFRE
          </Text>
          <View
            style={{
              padding: 18,
              borderRadius: 18,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                gap: 8,
              }}
            >
              <TextInput
                value={offer}
                onChangeText={(t) => setOffer(t.replace(/\D/g, ''))}
                keyboardType="number-pad"
                style={{
                  fontSize: 34,
                  fontWeight: '700',
                  color: colors.text,
                  letterSpacing: -0.5,
                  fontVariant: ['tabular-nums'],
                  padding: 0,
                  minWidth: 120,
                  textAlign: 'right',
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.textMuted,
                }}
              >
                GNF
              </Text>
            </View>
            {value > 0 && (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  paddingHorizontal: 10,
                  height: 24,
                  borderRadius: 999,
                  backgroundColor: isBelow ? 'rgba(34,168,113,0.16)' : 'rgba(232,165,61,0.18)',
                }}
              >
                {isBelow ? (
                  <ArrowDownToLine size={11} color={colors.success} strokeWidth={2.5} />
                ) : (
                  <ArrowUpRight size={11} color={colors.accentText} strokeWidth={2.5} />
                )}
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: isBelow ? colors.success : colors.accentText,
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {isBelow ? '' : '+'}
                  {deltaPct}% vs prix demandé
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Duration */}
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
            DURÉE DU BAIL
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {TERMS.map((t) => {
              const active = term === t.id;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => {
                    haptic.selection();
                    setTerm(t.id);
                  }}
                  style={{
                    flex: 1,
                    height: 46,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: active ? colors.text : colors.border,
                    backgroundColor: active ? colors.text : colors.card,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '700',
                      color: active ? colors.bg : colors.text,
                      letterSpacing: 0,
                      lineHeight: 16,
                      includeFontPadding: false,
                    }}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Message */}
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
            MESSAGE · OPTIONNEL
          </Text>
          <View
            style={{
              minHeight: 100,
              padding: 14,
              borderRadius: 16,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Présente-toi à l'agent…"
              placeholderTextColor={colors.textFaint}
              multiline
              textAlignVertical="top"
              style={{
                fontSize: 14,
                color: colors.text,
                lineHeight: 20,
                padding: 0,
                minHeight: 72,
              }}
            />
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
            router.replace('/buyer/requests');
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
            Envoyer l'offre
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}
