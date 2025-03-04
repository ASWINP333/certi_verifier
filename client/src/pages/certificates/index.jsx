import { Flex, Heading } from '@chakra-ui/react';

const CertificateList = () => {
  return (
    <Flex w='100%' h='100vh'>
      <Flex
        w='100%'
        h='100%'
        direction='column'
        alignItems='center'
        p='10'
        gap='12'
      >
        <Heading color='brand.mainTeal' textTransform='uppercase'>
          CERTIFICATES LIST
        </Heading>
        <Flex w='100%' h='100%'></Flex>
      </Flex>
    </Flex>
  );
};

export default CertificateList;
