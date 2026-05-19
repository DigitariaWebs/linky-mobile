/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand — same in both themes
        primary: '#0E6E55',
        'primary-deep': '#0A5240',
        accent: '#E8A53D',
        success: '#1FA971',
        danger: '#D14F3C',
        info: '#3A7CA8',
        // Light theme surfaces (default)
        bg: '#F7F3EC',
        'bg-elev': '#FFFFFF',
        'bg-sunken': '#EFE8DA',
        card: '#FFFFFF',
        text: '#0E1311',
        'text-muted': '#5E6864',
        'text-faint': '#8C9590',
        border: '#E5DED1',
        'border-strong': '#D4CCBA',
        'primary-soft': '#E8F2EE',
        'accent-soft': '#FCF1DC',
        // Découvrir feed is ALWAYS dark regardless of theme
        'discover-bg': '#0E1311',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        pill: '999px',
      },
      fontFamily: {
        display: ['CabinetGrotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'disp-xl': ['32px', { lineHeight: '36px', letterSpacing: '-0.02em' }],
        'disp-l': ['26px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        'title-l': ['20px', { lineHeight: '26px', letterSpacing: '-0.01em' }],
        'title-m': ['17px', { lineHeight: '22px', letterSpacing: '-0.005em' }],
        'body-l': ['16px', { lineHeight: '24px' }],
        'body-m': ['14px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '16px', letterSpacing: '0.2px' }],
        micro: ['11px', { lineHeight: '14px', letterSpacing: '0.5px' }],
      },
    },
  },
  plugins: [],
};
