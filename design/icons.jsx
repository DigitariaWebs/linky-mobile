// Lucide-style icons as React components. Stroke 1.5, 24×24 default.
const Icon = ({ size = 20, stroke = 1.5, children, color = "currentColor", style, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }}
    {...rest}
  >
    {children}
  </svg>
);

const I = {
  home: (p) => <Icon {...p}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></Icon>,
  shop: (p) => <Icon {...p}><path d="M3 7l1-3h16l1 3" /><path d="M3 7h18v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0V7z" /><path d="M5 10v10h14V10" /></Icon>,
  sparkle: (p) => <Icon {...p}><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" /><path d="M19 4l.6 1.4L21 6l-1.4.6L19 8l-.6-1.4L17 6l1.4-.6z" /></Icon>,
  store: (p) => <Icon {...p}><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M4 9V5h16v4" /><path d="M9 13h6v7H9z" /></Icon>,
  user: (p) => <Icon {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></Icon>,
  bell: (p) => <Icon {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></Icon>,
  cart: (p) => <Icon {...p}><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /><path d="M3 4h2l2.5 11h11l2.5-8H6" /></Icon>,
  search: (p) => <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></Icon>,
  camera: (p) => <Icon {...p}><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="4" /></Icon>,
  heart: (p) => <Icon {...p}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.7 8.8-8.7a5.5 5.5 0 0 0 0-7.7z" /></Icon>,
  heartFill: (p) => <Icon {...p} fill="currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.5l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.7 8.8-8.7a5.5 5.5 0 0 0 0-7.7z" /></Icon>,
  send: (p) => <Icon {...p}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></Icon>,
  msg: (p) => <Icon {...p}><path d="M21 12a8 8 0 0 1-12.3 6.7L3 21l2.3-5.7A8 8 0 1 1 21 12z" /></Icon>,
  bookmark: (p) => <Icon {...p}><path d="M6 3h12v18l-6-4-6 4z" /></Icon>,
  share: (p) => <Icon {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4" /><path d="M15.4 6.5l-6.8 4" /></Icon>,
  info: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8.5h.01" /><path d="M11 12h1v5h1" /></Icon>,
  chevronR: (p) => <Icon {...p}><path d="M9 6l6 6-6 6" /></Icon>,
  chevronL: (p) => <Icon {...p}><path d="M15 6l-6 6 6 6" /></Icon>,
  chevronD: (p) => <Icon {...p}><path d="M6 9l6 6 6-6" /></Icon>,
  chevronU: (p) => <Icon {...p}><path d="M6 15l6-6 6 6" /></Icon>,
  arrowLeft: (p) => <Icon {...p}><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></Icon>,
  arrowRight: (p) => <Icon {...p}><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></Icon>,
  close: (p) => <Icon {...p}><path d="M18 6L6 18M6 6l12 12" /></Icon>,
  plus: (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>,
  minus: (p) => <Icon {...p}><path d="M5 12h14" /></Icon>,
  check: (p) => <Icon {...p}><path d="M20 6L9 17l-5-5" /></Icon>,
  shield: (p) => <Icon {...p}><path d="M12 3l8 3v6c0 4.5-3.5 8.5-8 9-4.5-.5-8-4.5-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></Icon>,
  wallet: (p) => <Icon {...p}><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M16 15h2" /></Icon>,
  star: (p) => <Icon {...p} fill="currentColor"><path d="M12 3l2.6 6 6.4.6-4.9 4.4 1.5 6.4L12 17l-5.6 3.4 1.5-6.4L3 9.6 9.4 9z" /></Icon>,
  starOutline: (p) => <Icon {...p}><path d="M12 3l2.6 6 6.4.6-4.9 4.4 1.5 6.4L12 17l-5.6 3.4 1.5-6.4L3 9.6 9.4 9z" /></Icon>,
  filter: (p) => <Icon {...p}><path d="M3 5h18" /><path d="M6 12h12" /><path d="M10 19h4" /></Icon>,
  sort: (p) => <Icon {...p}><path d="M3 6h18" /><path d="M6 12h12" /><path d="M10 18h4" /></Icon>,
  pin: (p) => <Icon {...p}><path d="M12 22s-7-8-7-13a7 7 0 1 1 14 0c0 5-7 13-7 13z" /><circle cx="12" cy="9" r="2.5" /></Icon>,
  road: (p) => <Icon {...p}><path d="M5 21l3-18" /><path d="M19 21l-3-18" /><path d="M12 5v2M12 10v2M12 15v2M12 20v1" /></Icon>,
  bed: (p) => <Icon {...p}><path d="M3 7v13" /><path d="M21 11v9" /><path d="M3 13h18" /><path d="M3 17h18" /><path d="M7 11a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" /></Icon>,
  area: (p) => <Icon {...p}><path d="M3 3h7v7H3z" /><path d="M14 14h7v7h-7z" /><path d="M14 3l7 7" /><path d="M3 14l7 7" /></Icon>,
  layers: (p) => <Icon {...p}><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 17l9 5 9-5" /></Icon>,
  video: (p) => <Icon {...p}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3z" /></Icon>,
  image: (p) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M3 17l5-5 5 5 3-3 5 5" /></Icon>,
  edit: (p) => <Icon {...p}><path d="M4 20h4l10-10-4-4L4 16z" /><path d="M14 6l4 4" /></Icon>,
  trash: (p) => <Icon {...p}><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" /><path d="M9 7V4h6v3" /></Icon>,
  more: (p) => <Icon {...p}><circle cx="6" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="18" cy="12" r="1" /></Icon>,
  moreV: (p) => <Icon {...p}><circle cx="12" cy="6" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="18" r="1" /></Icon>,
  settings: (p) => <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 7.1 4l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.7 1 1 1.5 1H21a2 2 0 1 1 0 4h-.1c-.7 0-1.3.3-1.6 1z" /></Icon>,
  logout: (p) => <Icon {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></Icon>,
  globe: (p) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></Icon>,
  zap: (p) => <Icon {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></Icon>,
  copy: (p) => <Icon {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>,
  download: (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></Icon>,
  upload: (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></Icon>,
  warn: (p) => <Icon {...p}><path d="M12 3l10 18H2z" /><path d="M12 10v4" /><path d="M12 17.5h.01" /></Icon>,
  eye: (p) => <Icon {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></Icon>,
  qr: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3z"/><path d="M21 14v3"/><path d="M14 21h7"/></Icon>,
  phone: (p) => <Icon {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></Icon>,
  card: (p) => <Icon {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></Icon>,
  truck: (p) => <Icon {...p}><path d="M3 17V7h10v10"/><path d="M13 11h5l3 3v3h-3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></Icon>,
  package: (p) => <Icon {...p}><path d="M21 16V8l-9-5-9 5v8l9 5z"/><path d="M3.3 7.5L12 12l8.7-4.5"/><path d="M12 12v10"/></Icon>,
  building: (p) => <Icon {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/><path d="M10 21v-3h4v3"/></Icon>,
  car: (p) => <Icon {...p}><path d="M5 16h14l-2-7H7z"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="16.5" cy="18" r="1.5"/></Icon>,
  shirt: (p) => <Icon {...p}><path d="M8 3l-5 4 2 3 3-1v12h12V9l3 1 2-3-5-4-3 1.5a3 3 0 0 1-6 0z"/></Icon>,
  drop: (p) => <Icon {...p}><path d="M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/></Icon>,
  sofa: (p) => <Icon {...p}><path d="M3 14v4h18v-4"/><path d="M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 14a2 2 0 0 1 2-2"/><path d="M21 14a2 2 0 0 0-2-2"/></Icon>,
  wifi: (p) => <Icon {...p}><path d="M5 12a10 10 0 0 1 14 0"/><path d="M8 15a6 6 0 0 1 8 0"/><circle cx="12" cy="18" r="1" fill="currentColor"/></Icon>,
  battery: (p) => <Icon {...p}><rect x="2" y="8" width="16" height="8" rx="1.5"/><path d="M20 11v2"/><rect x="3.5" y="9.5" width="11" height="5" fill="currentColor" stroke="none"/></Icon>,
  reception: (p) => <Icon {...p}><rect x="2" y="13" width="3" height="5" fill="currentColor" stroke="none"/><rect x="7" y="10" width="3" height="8" fill="currentColor" stroke="none"/><rect x="12" y="7" width="3" height="11" fill="currentColor" stroke="none"/><rect x="17" y="4" width="3" height="14" fill="currentColor" stroke="none"/></Icon>,
  flag: (p) => <Icon {...p}><path d="M4 21V4"/><path d="M4 4h13l-2 4 2 4H4"/></Icon>,
  flame: (p) => <Icon {...p}><path d="M12 3c0 5 6 5 6 11a6 6 0 1 1-12 0c0-3 2-5 4-5-2-3 2-6 2-6z"/></Icon>,
  trend: (p) => <Icon {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/></Icon>,
  refresh: (p) => <Icon {...p}><path d="M3 12a9 9 0 0 1 15.5-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.5L3 16"/><path d="M3 21v-5h5"/></Icon>,
  cloudOff: (p) => <Icon {...p}><path d="M3 3l18 18"/><path d="M19.5 17a4.5 4.5 0 0 0-3-8 6 6 0 0 0-9.5-3"/><path d="M4 7a4.5 4.5 0 0 0 1 9h11"/></Icon>,
  archive: (p) => <Icon {...p}><rect x="3" y="4" width="18" height="4"/><path d="M5 8v12h14V8"/><path d="M10 12h4"/></Icon>,
  link: (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1-1"/></Icon>,
  list: (p) => <Icon {...p}><path d="M8 6h12M8 12h12M8 18h12"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></Icon>,
  grid: (p) => <Icon {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></Icon>,
  calendar: (p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></Icon>,
  smile: (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M8 14a4 4 0 0 0 8 0"/><path d="M9 9h.01M15 9h.01"/></Icon>,
  paperclip: (p) => <Icon {...p}><path d="M21 11l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/></Icon>,
  mic: (p) => <Icon {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></Icon>,
  bolt: (p) => <Icon {...p} fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></Icon>,
};

window.I = I;
window.Icon = Icon;
