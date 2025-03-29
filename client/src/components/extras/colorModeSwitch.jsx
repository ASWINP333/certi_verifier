import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { CiLight, CiDark } from 'react-icons/ci';

const ColorModeSwitch = (props) => {
  const { toggleColorMode } = useColorMode();

  const SwitchIcon = useColorModeValue(CiDark, CiLight);

  const text = useColorModeValue('dark', 'light');
  const hoverBgColor = useColorModeValue('#989898', '#3E444B');
  const bgColor = useColorModeValue('#B8B7B9', '#20262D');

  return (
    <IconButton
      size='md'
      aria-label={`Switch to ${text} mode`}
      variant={{ lg: 'ghost' }}
      bg={bgColor}
      borderRadius='full'
      backdropFilter='blur(16px) saturate(180%)'
      _hover={{ bg: hoverBgColor }}
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      {...props}
    />
  );
};

export default ColorModeSwitch;
