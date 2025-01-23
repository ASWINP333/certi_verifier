import { Flex,Text } from "@chakra-ui/react";
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
      >
        <Text opacity='.8' fontSize='14px' fontWeight='bold'>
          Copyright © {currentYear} Land Owner Verification
        </Text>
      </Flex>
    );
  };
  
  export default Footer;