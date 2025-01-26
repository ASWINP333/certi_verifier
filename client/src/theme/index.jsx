import { theme as base, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      mainBg: '#9BDAD4',
      secondaryBg: '#00A8B573',
      bg: 'linear-gradient(90deg, #3F3F3F 100%, #1E1E1E 100%,#1E1E1E 100%)',
      white: '#FFFFFF',
      black: '#000000',
    },
  },
  fonts: {
    body: `'Space Grotesk', ${base.fonts?.body}`,
  },
});

export default theme;
