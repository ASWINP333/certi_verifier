import { Flex, Text } from '@chakra-ui/react';

import React from 'react';
import CertificateTemplate1 from './CertificateTemplate1';
import CertificateTemplate2 from './CertificateTemplate2';
import CertificateTemplate3 from './CertificateTemplate3';

const CertificateDownload = ({ templateData, ...rest }) => {
  const certificatePreviews = {
    CertificateTemplate1: () => (
      <CertificateTemplate1 templateData={templateData} {...rest} />
    ),
    CertificateTemplate2: () => (
      <CertificateTemplate2 templateData={templateData} {...rest} />
    ),
    CertificateTemplate3: () => (
      <CertificateTemplate3 templateData={templateData} {...rest} />
    ),
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
    if (templateId === 'TMP1') {
      return 'CertificateTemplate1';
    } else if (templateId === 'TMP2') {
      return 'CertificateTemplate2';
    } else if (templateId === 'TMP3') {
      return 'CertificateTemplate3';
    }
    return 'default';
  };

  return certificatePreviews[renderCertificate(templateData?.templateId)]();
};

export default CertificateDownload;
