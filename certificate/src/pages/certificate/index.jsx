import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { RenderCertificateTemplate } from '../../components';

const Certificate = () => {
  const data = {
    templateId: '1234',
    firstName: 'Aswin',
    lastName: 'P',
    certificateId: '12345',
    certificateType: 'Full Stack Development (MERN)',
    issuedDate: '2025-01-01',
    issuedBy: 'Aswin',
    previewSizeMultiplier: 1,
    grade: 'A',
  };
  return (
    <Flex w='100%' h='100vh'>
      <Flex
        w='100%'
        h='100%'
        direction='row'
        alignItems='center'
        p='8'
        gap='10'
      >
        <Flex w={{ base: '60%' }} alignItems='center' justify='center'>
          <Flex w={{ base: '80%' }}>
            <RenderCertificateTemplate
              {...{
                templateId: data.templateId,
                fullName: `${data.firstName} ${data.lastName}`,
                certificateId: data.certificateId,
                certificateType: data.certificateType,
                issuedDate: data.issuedDate,
                issuedBy: data.issuedBy,
                previewSizeMultiplier: data.previewSizeMultiplier,
                grade: data.grade,
              }}
            />
          </Flex>
        </Flex>
        <Flex
          w={{ base: '30%' }}
          h='100%'
          alignItems='center'
          justify='center'
          direction='column'
          gap='4'
        >
          <Flex
            w='30rem'
            h='22rem'
            p='4'
            border='2px solid'
            direction='column'
            borderColor='#0AE8FD'
            rounded='1rem'
            bg='#011623'
            gap='4'
          >
            <Heading
              color='brand.white'
              textAlign='center'
              fontSize={{ base: '1.5rem' }}
            >
              Certificate Details
            </Heading>
            <Flex w='100%' h='full' direction='column' gap='2'>
              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Certificate Id :</Flex>
                <Flex>123</Flex>
              </Flex>

              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Certificate Name :</Flex>
                <Flex>Full Stack Development</Flex>
              </Flex>

              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Course :</Flex>
                <Flex>BCA</Flex>
              </Flex>

              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Grade :</Flex>
                <Flex>A+</Flex>
              </Flex>

              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Issued By :</Flex>
                <Flex>Roshan K</Flex>
              </Flex>

              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Created At :</Flex>
                <Flex>2025-03-15</Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            w='30rem'
            h='15rem'
            border='2px solid'
            borderColor='#0AE8FD'
            rounded='1rem'
            bg='#011623'
            direction='column'
            p='4'
            gap='4'
          >
            <Heading
              color='brand.white'
              textAlign='center'
              fontSize={{ base: '1.5rem' }}
            >
              Blockchain Details
            </Heading>
            <Flex w='100%' h='full' direction='column' gap='4'>
              <Flex
                flexDir='row'
                w='100%'
                justifyContent='space-between'
                align-items='flex-start'
                p='1'
                gap={{ base: '0.5rem', md: '0.75rem' }}
                h='auto'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Flex>Block No :</Flex>
                <Flex>7859409</Flex>
              </Flex>

              <Flex
                w='100%'
                direction='column'
                align-items='center'
                justify='center'
                p='1'
                gap='2'
                fontSize={{ base: '0.775rem', md: '1rem' }}
                color='brand.white'
                fontWeight='semibold'
              >
                <Text textAlign='center' fontSize={{ base: '1.2rem' }}>
                  Transaction Hash
                </Text>
                <Text
                  as={Link}
                  textAlign='center'
                  fontWeight='normal'
                  color='#0AE8FD'
                >
                  0xe6fef3816356b617b33f1e00c496cb4988f049e44ce052cf488206df2a7d3d31
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Certificate;
