// Lucide-style icons, ported from /design/icons.jsx as native SVG.
// 24x24 viewBox, stroke 1.5. Color defaults to currentColor — pass `color` to override.
import type { ReactNode } from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

export interface IconProps {
  size?: number;
  stroke?: number;
  color?: string;
  fill?: string;
}

function Frame({
  size = 20,
  stroke = 1.5,
  color = 'currentColor',
  fill = 'none',
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

export const I = {
  home: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 11l9-8 9 8" />
      <Path d="M5 10v10h14V10" />
    </Frame>
  ),
  shop: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 7l1-3h16l1 3" />
      <Path d="M3 7h18v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V7z" />
      <Path d="M5 10v10h14V10" />
    </Frame>
  ),
  sparkle: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />
      <Path d="M19 4l.6 1.4L21 6l-1.4.6L19 8l-.6-1.4L17 6l1.4-.6z" />
    </Frame>
  ),
  store: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="4" y="9" width="16" height="11" rx="1.5" />
      <Path d="M4 9V5h16v4" />
      <Path d="M9 13h6v7H9z" />
    </Frame>
  ),
  user: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="12" cy="8" r="4" />
      <Path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </Frame>
  ),
  bell: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <Path d="M10 21a2 2 0 0 0 4 0" />
    </Frame>
  ),
  cart: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="9" cy="20" r="1.5" />
      <Circle cx="17" cy="20" r="1.5" />
      <Path d="M3 4h2l2.5 11h11l2.5-8H6" />
    </Frame>
  ),
  search: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="11" cy="11" r="7" />
      <Path d="M21 21l-4.5-4.5" />
    </Frame>
  ),
  camera: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <Circle cx="12" cy="13" r="4" />
    </Frame>
  ),
  heart: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.7 8.8-8.7a5.5 5.5 0 0 0 0-7.7z" />
    </Frame>
  ),
  heartFill: (p: IconProps) => (
    <Frame {...p} fill={p.color ?? 'currentColor'}>
      <Path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.7 8.8-8.7a5.5 5.5 0 0 0 0-7.7z" />
    </Frame>
  ),
  send: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M22 2L11 13" />
      <Path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </Frame>
  ),
  msg: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M21 12a8 8 0 0 1-12.3 6.7L3 21l2.3-5.7A8 8 0 1 1 21 12z" />
    </Frame>
  ),
  bookmark: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M6 3h12v18l-6-4-6 4z" />
    </Frame>
  ),
  share: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="18" cy="5" r="3" />
      <Circle cx="6" cy="12" r="3" />
      <Circle cx="18" cy="19" r="3" />
      <Path d="M8.6 13.5l6.8 4" />
      <Path d="M15.4 6.5l-6.8 4" />
    </Frame>
  ),
  info: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 8.5h.01" />
      <Path d="M11 12h1v5h1" />
    </Frame>
  ),
  chevronR: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M9 6l6 6-6 6" />
    </Frame>
  ),
  chevronL: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M15 6l-6 6 6 6" />
    </Frame>
  ),
  chevronD: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M6 9l6 6 6-6" />
    </Frame>
  ),
  chevronU: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M6 15l6-6 6 6" />
    </Frame>
  ),
  arrowLeft: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M19 12H5" />
      <Path d="M12 19l-7-7 7-7" />
    </Frame>
  ),
  arrowRight: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M5 12h14" />
      <Path d="M12 5l7 7-7 7" />
    </Frame>
  ),
  close: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M18 6L6 18M6 6l12 12" />
    </Frame>
  ),
  plus: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 5v14M5 12h14" />
    </Frame>
  ),
  minus: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M5 12h14" />
    </Frame>
  ),
  check: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M20 6L9 17l-5-5" />
    </Frame>
  ),
  shield: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" />
      <Path d="M9 12l2 2 4-4" />
    </Frame>
  ),
  wallet: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="3" y="6" width="18" height="14" rx="2" />
      <Path d="M3 10h18" />
      <Path d="M16 15h2" />
    </Frame>
  ),
  star: (p: IconProps) => (
    <Frame {...p} fill={p.color ?? 'currentColor'}>
      <Path d="M12 3l2.6 6 6.4.6-4.9 4.4 1.5 6.4L12 17l-5.6 3.4 1.5-6.4L3 9.6 9.4 9z" />
    </Frame>
  ),
  starOutline: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 3l2.6 6 6.4.6-4.9 4.4 1.5 6.4L12 17l-5.6 3.4 1.5-6.4L3 9.6 9.4 9z" />
    </Frame>
  ),
  filter: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 5h18" />
      <Path d="M6 12h12" />
      <Path d="M10 19h4" />
    </Frame>
  ),
  sort: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 6h18" />
      <Path d="M6 12h12" />
      <Path d="M10 18h4" />
    </Frame>
  ),
  pin: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 22s-7-8-7-13a7 7 0 1 1 14 0c0 5-7 13-7 13z" />
      <Circle cx="12" cy="9" r="2.5" />
    </Frame>
  ),
  road: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M5 21l3-18" />
      <Path d="M19 21l-3-18" />
      <Path d="M12 5v2M12 10v2M12 15v2M12 20v1" />
    </Frame>
  ),
  bed: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 7v13" />
      <Path d="M21 11v9" />
      <Path d="M3 13h18" />
      <Path d="M3 17h18" />
      <Path d="M7 11a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" />
    </Frame>
  ),
  area: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 3h7v7H3z" />
      <Path d="M14 14h7v7h-7z" />
      <Path d="M14 3l7 7" />
      <Path d="M3 14l7 7" />
    </Frame>
  ),
  layers: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 3l9 5-9 5-9-5z" />
      <Path d="M3 12l9 5 9-5" />
      <Path d="M3 17l9 5 9-5" />
    </Frame>
  ),
  video: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="3" y="6" width="13" height="12" rx="2" />
      <Path d="M16 10l5-3v10l-5-3z" />
    </Frame>
  ),
  image: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="3" y="3" width="18" height="18" rx="2" />
      <Circle cx="9" cy="9" r="2" />
      <Path d="M3 17l5-5 5 5 3-3 5 5" />
    </Frame>
  ),
  edit: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M4 20h4l10-10-4-4L4 16z" />
      <Path d="M14 6l4 4" />
    </Frame>
  ),
  trash: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M4 7h16" />
      <Path d="M10 11v6M14 11v6" />
      <Path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
      <Path d="M9 7V4h6v3" />
    </Frame>
  ),
  more: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="6" cy="12" r="1" />
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="18" cy="12" r="1" />
    </Frame>
  ),
  moreV: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="12" cy="6" r="1" />
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="12" cy="18" r="1" />
    </Frame>
  ),
  settings: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="12" cy="12" r="3" />
      <Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7.1 4l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.7 1 1 1.5 1H21a2 2 0 1 1 0 4h-.1c-.7 0-1.3.3-1.6 1z" />
    </Frame>
  ),
  logout: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <Path d="M16 17l5-5-5-5" />
      <Path d="M21 12H9" />
    </Frame>
  ),
  globe: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M3 12h18" />
      <Path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </Frame>
  ),
  zap: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </Frame>
  ),
  download: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <Path d="M7 10l5 5 5-5" />
      <Path d="M12 15V3" />
    </Frame>
  ),
  upload: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <Path d="M17 8l-5-5-5 5" />
      <Path d="M12 3v12" />
    </Frame>
  ),
  warn: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 3l10 18H2z" />
      <Path d="M12 10v4" />
      <Path d="M12 17.5h.01" />
    </Frame>
  ),
  eye: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <Circle cx="12" cy="12" r="3" />
    </Frame>
  ),
  qr: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="3" y="3" width="7" height="7" rx="1" />
      <Rect x="14" y="3" width="7" height="7" rx="1" />
      <Rect x="3" y="14" width="7" height="7" rx="1" />
      <Path d="M14 14h3v3h-3z" />
      <Path d="M21 14v3" />
      <Path d="M14 21h7" />
    </Frame>
  ),
  phone: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </Frame>
  ),
  phoneFill: (p: IconProps) => (
    <Frame {...p} fill={p.color ?? 'currentColor'}>
      <Path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </Frame>
  ),
  globeFill: (p: IconProps) => (
    <Frame {...p} fill={p.color ?? 'currentColor'}>
      <Path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 0 1-3.5-.8c1-.7 1.9-2.5 2.3-4.6.4.1.8.1 1.2.1.4 0 .8 0 1.2-.1.4 2.1 1.3 3.9 2.3 4.6A8 8 0 0 1 12 20zm-1-15.9V4c-.4 1.4-1.4 2.5-2.6 3a8 8 0 0 1 2.6-2.9zm2 .1V4a8 8 0 0 1 2.6 2.9c-1.2-.4-2.2-1.5-2.6-2.7zM4.6 9a8 8 0 0 1 2.6-3c.3 1.4.9 2.7 1.8 3.7a14 14 0 0 1-4.4-.7zM4 12c0-.3 0-.6.1-.9 1.5.5 3.1.8 4.8.8.1.7.1 1.4 0 2.1-1.6 0-3.3.3-4.8.8-.1-.3-.1-.5-.1-.8zm.6 3a14 14 0 0 1 4.4-.7c-.9 1-1.5 2.3-1.8 3.7a8 8 0 0 1-2.6-3zm10.8 0a14 14 0 0 1 4.4.7 8 8 0 0 1-2.6 3c-.3-1.4-.9-2.7-1.8-3.7zM20 12c0 .3 0 .5-.1.8-1.5-.5-3.1-.8-4.8-.8-.1-.7-.1-1.4 0-2.1 1.6 0 3.3-.3 4.8-.8.1.3.1.6.1.9zm-1-3a14 14 0 0 1-4.4.7c.9-1 1.5-2.3 1.8-3.7a8 8 0 0 1 2.6 3z" />
    </Frame>
  ),
  card: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="2" y="5" width="20" height="14" rx="2" />
      <Path d="M2 10h20" />
    </Frame>
  ),
  truck: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 17V7h10v10" />
      <Path d="M13 11h5l3 3v3h-3" />
      <Circle cx="7" cy="18" r="2" />
      <Circle cx="17" cy="18" r="2" />
    </Frame>
  ),
  package: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M21 16V8l-9-5-9 5v8l9 5z" />
      <Path d="M3.3 7.5L12 12l8.7-4.5" />
      <Path d="M12 12v10" />
    </Frame>
  ),
  building: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="4" y="3" width="16" height="18" rx="1" />
      <Path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
      <Path d="M10 21v-3h4v3" />
    </Frame>
  ),
  car: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M5 16h14l-2-7H7z" />
      <Circle cx="7.5" cy="18" r="1.5" />
      <Circle cx="16.5" cy="18" r="1.5" />
    </Frame>
  ),
  shirt: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M8 3l-5 4 2 3 3-1v12h12V9l3 1 2-3-5-4-3 1.5a3 3 0 0 1-6 0z" />
    </Frame>
  ),
  drop: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z" />
    </Frame>
  ),
  sofa: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 14v4h18v-4" />
      <Path d="M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
      <Path d="M3 14a2 2 0 0 1 2-2" />
      <Path d="M21 14a2 2 0 0 0-2-2" />
    </Frame>
  ),
  wifi: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M5 12a10 10 0 0 1 14 0" />
      <Path d="M8 15a6 6 0 0 1 8 0" />
      <Circle cx="12" cy="18" r="1" fill={p.color ?? 'currentColor'} />
    </Frame>
  ),
  cloudOff: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 3l18 18" />
      <Path d="M19.5 17a4.5 4.5 0 0 0-3-8 6 6 0 0 0-9.5-3" />
      <Path d="M4 7a4.5 4.5 0 0 0 1 9h11" />
    </Frame>
  ),
  trend: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 17l6-6 4 4 8-8" />
      <Path d="M21 7v6h-6" />
    </Frame>
  ),
  refresh: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M3 12a9 9 0 0 1 15.5-6.5L21 8" />
      <Path d="M21 3v5h-5" />
      <Path d="M21 12a9 9 0 0 1-15.5 6.5L3 16" />
      <Path d="M3 21v-5h5" />
    </Frame>
  ),
  list: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M8 6h12M8 12h12M8 18h12" />
      <Circle cx="4" cy="6" r="1" fill={p.color ?? 'currentColor'} />
      <Circle cx="4" cy="12" r="1" fill={p.color ?? 'currentColor'} />
      <Circle cx="4" cy="18" r="1" fill={p.color ?? 'currentColor'} />
    </Frame>
  ),
  calendar: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="3" y="5" width="18" height="16" rx="2" />
      <Path d="M3 9h18" />
      <Path d="M8 3v4M16 3v4" />
    </Frame>
  ),
  smile: (p: IconProps) => (
    <Frame {...p}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M8 14a4 4 0 0 0 8 0" />
      <Path d="M9 9h.01M15 9h.01" />
    </Frame>
  ),
  paperclip: (p: IconProps) => (
    <Frame {...p}>
      <Path d="M21 11l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" />
    </Frame>
  ),
  bolt: (p: IconProps) => (
    <Frame {...p} fill={p.color ?? 'currentColor'}>
      <Path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </Frame>
  ),
  archive: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="3" y="4" width="18" height="4" />
      <Path d="M5 8v12h14V8" />
      <Path d="M10 12h4" />
    </Frame>
  ),
  battery: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="2" y="8" width="16" height="8" rx="1.5" />
      <Path d="M20 11v2" />
      <Rect x="3.5" y="9.5" width="11" height="5" fill={p.color ?? 'currentColor'} stroke="none" />
    </Frame>
  ),
  reception: (p: IconProps) => (
    <Frame {...p}>
      <Rect x="2" y="13" width="3" height="5" fill={p.color ?? 'currentColor'} stroke="none" />
      <Rect x="7" y="10" width="3" height="8" fill={p.color ?? 'currentColor'} stroke="none" />
      <Rect x="12" y="7" width="3" height="11" fill={p.color ?? 'currentColor'} stroke="none" />
      <Rect x="17" y="4" width="3" height="14" fill={p.color ?? 'currentColor'} stroke="none" />
    </Frame>
  ),
};

export type IconKey = keyof typeof I;
