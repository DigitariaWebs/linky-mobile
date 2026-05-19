import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
} from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../src/theme/ThemeProvider';
import { Text } from '../../src/components/primitives/Text';
import { Button } from '../../src/components/primitives/Button';

type FieldKey = 'email' | 'password' | 'confirm';

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  Icon,
  secure,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  Icon: typeof Mail;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
}) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [reveal, setReveal] = useState(false);
  return (
    <View>
      <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textFaint, letterSpacing: 0.6, marginBottom: 8 }}>
        {label}
      </Text>
      <View
        style={{
          height: 56,
          paddingHorizontal: 14,
          borderRadius: 16,
          borderWidth: focused ? 2 : 1,
          borderColor: focused ? colors.primary : colors.border,
          backgroundColor: colors.card,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Icon size={18} color={focused ? colors.primary : colors.textMuted} strokeWidth={1.75} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textFaint}
          secureTextEntry={secure && !reveal}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            fontSize: 15.5,
            fontWeight: '500',
            color: colors.text,
            padding: 0,
          }}
        />
        {secure && (
          <Pressable onPress={() => setReveal((r) => !r)} hitSlop={8}>
            {reveal ? (
              <EyeOff size={18} color={colors.textMuted} strokeWidth={1.75} />
            ) : (
              <Eye size={18} color={colors.textMuted} strokeWidth={1.75} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function EmailRoute() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('fatou.balde@gmail.com');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const passwordOk = password.length >= 6;
  const passwordsMatch = passwordOk && password === confirm;
  const valid = email.includes('@') && passwordOk && passwordsMatch;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ paddingTop: 8, paddingBottom: 24 }}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace('/(onboarding)/auth-choice');
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={18} color={colors.text} />
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
              backgroundColor: colors.primarySoft,
              marginBottom: 14,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '700', color: colors.primaryDeep, letterSpacing: 0.4 }}>
              INSCRIPTION
            </Text>
          </View>

          <Text variant="dispL" style={{ fontSize: 32, lineHeight: 38 }}>
            Crée ton compte.
          </Text>
          <Text
            variant="bodyM"
            tone="muted"
            style={{ marginTop: 10, fontSize: 15, lineHeight: 22, letterSpacing: 0 }}
          >
            Pour payer en € avec ta carte bancaire.
          </Text>

          <View style={{ marginTop: 24, gap: 14 }}>
            <FormField
              label="EMAIL"
              value={email}
              onChangeText={setEmail}
              placeholder="toi@exemple.com"
              Icon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormField
              label="MOT DE PASSE"
              value={password}
              onChangeText={setPassword}
              placeholder="Au moins 6 caractères"
              Icon={Lock}
              secure
            />
            <FormField
              label="CONFIRMER"
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Retape ton mot de passe"
              Icon={Lock}
              secure
            />
            {confirm.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4 }}>
                <Check
                  size={12}
                  color={passwordsMatch ? colors.success : colors.textFaint}
                  strokeWidth={3}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: passwordsMatch ? colors.success : colors.textMuted,
                    letterSpacing: 0,
                  }}
                >
                  {passwordsMatch ? 'Mots de passe identiques' : 'Les mots de passe ne correspondent pas'}
                </Text>
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 22 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            <Text style={{ fontSize: 11, fontWeight: '700', color: colors.textFaint, letterSpacing: 0.6 }}>
              OU CONTINUER AVEC
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
          </View>

          {/* SSO buttons */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              onPress={() => router.push('/(onboarding)/profile-setup')}
              style={{
                flex: 1,
                height: 54,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <GoogleLogo size={18} />
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>Google</Text>
            </Pressable>
            <Pressable
              onPress={() => router.push('/(onboarding)/profile-setup')}
              style={{
                flex: 1,
                height: 54,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <AppleLogo size={20} color={colors.text} />
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>Apple</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ paddingBottom: 4 }}>
          <Button
            variant="dark"
            size="lg"
            block
            label="Créer mon compte"
            disabled={!valid}
            onPress={() => router.push('/(onboarding)/profile-setup')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Official Google "G" — four-color brand mark.
function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <Path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <Path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <Path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </Svg>
  );
}

// Official Apple silhouette — bitten apple with leaf.
function AppleLogo({ size = 20, color = '#000000' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 384 512">
      <Path
        fill={color}
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </Svg>
  );
}
