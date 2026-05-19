import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeProvider';
import { Text } from '../primitives/Text';

type ToastTone = 'info' | 'success' | 'danger';
interface ToastMsg {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  show: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([]);

  const show = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, tone }]);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 90,
          alignItems: 'stretch',
          gap: 8,
        }}
      >
        {items.map((t) => (
          <ToastItem key={t.id} item={t} onDismiss={() => setItems((p) => p.filter((x) => x.id !== t.id))} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

function ToastItem({ item, onDismiss }: { item: ToastMsg; onDismiss: () => void }) {
  const { colors } = useTheme();
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);
  const bg =
    item.tone === 'success' ? colors.success : item.tone === 'danger' ? colors.danger : colors.text;
  return (
    <Animated.View
      entering={SlideInDown.springify().damping(15)}
      exiting={SlideOutDown.duration(180)}
      style={{
        backgroundColor: bg,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 14,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 13 }}>{item.message}</Text>
    </Animated.View>
  );
}

export function useToast() {
  const c = useContext(ToastContext);
  if (!c) throw new Error('useToast must be used inside ToastProvider');
  return c;
}

// Re-export for fade animations used elsewhere
export { FadeIn, FadeOut };
