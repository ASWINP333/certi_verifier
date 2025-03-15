import { Flex, Text } from '@chakra-ui/react';

import React from 'react';
import CertificateTemplate1 from './CertificateTemplate1';


const RenderCertificateTemplate = ({ templateId, ...rest }) => {
  const certificatePreviews = {
    CertificateTemplate1: () => <CertificateTemplate1 {...rest} />,
    default: () => (
      <Flex
        bgColor='white'
        w={{ base: '300px', md: '500px' }}
        p='4'
        h='150px'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontWeight='medium'>
          Certificate Preview not available, Please select a Template ID!
        </Text>
      </Flex>
    ),
  };

  const renderCertificate = (templateId) => {
    if (templateId === '1234') {
      return 'CertificateTemplate1';
    }
    return 'default';
  };

  return certificatePreviews[renderCertificate(templateId)]();
};

export default RenderCertificateTemplate;
