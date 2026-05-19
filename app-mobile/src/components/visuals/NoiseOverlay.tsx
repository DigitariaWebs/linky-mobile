import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Deterministic, seeded dots so the texture doesn't reshuffle on re-render.
const NOISE_DOTS = Array.from({ length: 240 }, (_, i) => {
  const seed = (i + 1) * 2654435761;
  const a = ((seed >>> 0) % 10000) / 10000;
  const b = (((seed * 16807) >>> 0) % 10000) / 10000;
  const c = (((seed * 48271) >>> 0) % 10000) / 10000;
  return {
    cx: a * 100,
    cy: b * 100,
    r: 0.18 + c * 0.32,
    o: 0.04 + c * 0.1,
  };
});

export function NoiseOverlay({ color = '#FFFFFF' }: { color?: string }) {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {NOISE_DOTS.map((d, i) => (
          <Circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={color} opacity={d.o} />
        ))}
      </Svg>
    </View>
  );
}
