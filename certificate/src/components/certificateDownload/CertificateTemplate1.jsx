/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CertificateTemplate1 = ({
  templateData,
  certificateId,
  certificateName,
  candidateName,
  course,
  grade,
  institutionName,
  createdDate,
  previewSizeMultiplier,
  children,
  ...rest
}) => {
  const certificateRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const textCenterStyle = {
    w: '80%',
    mx: 'auto',
    textAlign: 'center',
  };

  const certificateSize = { width: 1123, height: 794 };

  const template = templateData?.templateImage?.url;

  const downloadPDF = useCallback(async () => {
    setIsProcessing(true);
    const certificateElement = certificateRef.current;

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [certificateSize.width, certificateSize.height],
      });

      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        certificateSize.width,
        certificateSize.height
      );

      pdf.setProperties({
        title: 'Certi_verifier',
        subject: 'Blockchain verifiable certificate',
        author: 'Certi verifier',
        keywords: 'Blockchain, Verified',
      });

      pdf.save('certificate.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <Flex direction='column' gap='2'>
      <Box
        maxWidth={`${certificateSize.width * previewSizeMultiplier}px `}
        maxHeight={`${certificateSize.height * previewSizeMultiplier}px `}
        ref={certificateRef}
        minWidth='250px'
        userSelect='none'
        fontFamily='Nunito Sans'
        fontSize='1rem'
        pointerEvents='none'
        htmlFor='achievement-certificate-preview'
        {...rest}
      >
        <Flex w='auto' h='full' alignItems='center' position='relative'>
          <Image
            src={template}
            alt='certificate'
            draggable='false'
            w='auto'
            h='full'
          />
          <Flex position='absolute' w='full' h='full' flexDirection='column'>
            <Text
              htmlFor='certificate-for'
              fontWeight='bold'
              fontSize='1.5rem'
              fontFamily='Poppins'
              mt='20%'
              {...textCenterStyle}
            >
              {certificateName}
            </Text>
            <Text
              htmlFor='full-name'
              fontWeight='semibold'
              fontSize='2.2rem'
              textTransform='capitalize'
              {...textCenterStyle}
            >
              {candidateName}
            </Text>
            <Text htmlFor='description' fontSize='0.8rem' {...textCenterStyle}>
              This is to certify that the recipient has successfully completed
              the {course} program, demonstrating a high level of dedication.
              The candidate has achieved an outstanding grade of {grade} ,
              reflecting their exceptional understanding of the subject matter.
              This certificate is proudly issued on {createdDate}.
            </Text>
            <Flex
              htmlFor='signature-date'
              position='absolute'
              w='30%'
              left='70%'
              top='72%'
              fontSize='0.5rem'
              flexDir='column'
              gap='2'
            >
              <Flex gap='2'>
                <Text letterSpacing='0.1rem' fontSize='0.6rem'>
                  Date :
                </Text>
                <Text fontWeight='semibold' fontSize='0.6rem'>
                  {createdDate}
                </Text>
              </Flex>
              <Flex gap='2'>
                <Text letterSpacing='0.1rem' fontSize='0.6rem'>
                  Certificate ID :
                </Text>
                <Text fontWeight='semibold' fontSize='0.6rem'>
                  {certificateId}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        as={Button}
        p='1'
        alignItems='center'
        justifyContent='center'
        onClick={downloadPDF}
        isLoading={isProcessing}
        cursor='pointer'
        w='8rem'
        color='brand.white'
        bg='brand.mainTeal'
        {...rest}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default CertificateTemplate1;
