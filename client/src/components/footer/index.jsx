import { Flex, Text } from '@chakra-ui/react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Flex
      w='100%'
      bottom='1%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      position='absolute'
      color='brand.mainTeal'
    >
      <Text opacity='.8' fontSize='1rem' fontWeight='bold'>
        Copyright © {currentYear} Certi Verifier
      </Text>
    </Flex>
  );
};

export default Footer;
