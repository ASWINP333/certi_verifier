import { useColorModeValue } from '@chakra-ui/react';

export const useThemeColors = () => {
  return {
    mainBg: useColorModeValue('brand.white', 'brand.mainTeal'),
    mainColor: useColorModeValue('brand.mainTeal', 'brand.white'),
    mainCardBg: useColorModeValue('tranparent', '#3d3d3d'),
  };
};
