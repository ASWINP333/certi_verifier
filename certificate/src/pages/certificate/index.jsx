import { Flex, Heading, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import { RenderCertificateTemplate } from '../../components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import axiosInstance from '../../config/axiosInstance';
import CertificateDownload from '../../components/certificateDownload/CertificateDownload';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const Certificate = () => {
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blockchainData, setBlockchainData] = useState({});

  const user = getItemFromLocalStorage('student-user');
  const { search } = useLocation();
  const toast = useToast();

  const certificateId = new URLSearchParams(search).get('cId');
  const institutionId = new URLSearchParams(search).get('iId');

  const previewSizeMultiplier = 1;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getDetailsFromBlockchain();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetailsFromBlockchain = async () => {
    setLoading(true);
    try {
      const { data, status, statusText } = await axiosInstance.get(
        `certificate/get/${certificateId}/${institutionId}`
      );

      if (status === 200 && statusText === 'OK') {
        const certificateData = data?.certificate;
        const formattedDate = dayjs(certificateData?.createdAt).format(
          'DD MMM YYYY'
        );

        setCertificateData({
          certificateId: certificateData?.cId,
          templateData: certificateData?.templateId,
          certificateName: certificateData?.certificateName,
          candidateName: certificateData?.candidateName,
          course: certificateData?.course,
          grade: certificateData?.grade,
          institutionName: certificateData?.institutionDetails?.institutionName,
          createdDate: formattedDate,
          issuedBy: `${certificateData?.issuedBy?.firstName} ${certificateData?.issuedBy?.lastName}`,
        });
        setBlockchainData(certificateData?.transactionDetails);
        setLoading(false);
      }
    } catch (error) {
      setCertificateData(null); // Ensure no broken data is rendered
      setBlockchainData({});
      setLoading(false);
      toast({
        title: error?.response?.data?.status?.toUpperCase(),
        status: 'error',
        description: error?.response?.data?.message,
        isClosable: true,
        position: 'top',
        variant: 'top-accent',
      });
    }
  };
  return (
    <Flex w='100%' h='100vh'>
      {certificateData !== null ? (
        <Flex
          w='100%'
          h='100%'
          direction='row'
          alignItems='center'
          p='8'
          gap='10'
        >
          {loading ? (
            <Flex w='100%' h='100%' alignItems='center' justify='center'>
              <Spinner
                w='8rem'
                h='8rem'
                alignSelf='center'
                color='brand.mainTeal'
                thickness='0.6rem'
              />
            </Flex>
          ) : (
            <Flex w={{ base: '60%' }} alignItems='center' justify='center'>
             {
              !user ? (
                <Flex w={{ base: '80%' }}>
                <RenderCertificateTemplate
                  {...{
                    templateData: certificateData?.templateData,
                    certificateId: certificateData?.certificateId,
                    certificateName: certificateData?.certificateName,
                    candidateName: certificateData?.candidateName,
                    course: certificateData?.course,
                    grade: certificateData?.grade,
                    institutionName: certificateData?.institutionName,
                    createdDate: certificateData?.createdDate,
                    previewSizeMultiplier: previewSizeMultiplier,
                  }}
                />
              </Flex>
              ) : (
                <Flex w={{ base: '80%' }}>
                <CertificateDownload
                  {...{
                    templateData: certificateData?.templateData,
                    certificateId: certificateData?.certificateId,
                    certificateName: certificateData?.certificateName,
                    candidateName: certificateData?.candidateName,
                    course: certificateData?.course,
                    grade: certificateData?.grade,
                    institutionName: certificateData?.institutionName,
                    createdDate: certificateData?.createdDate,
                    previewSizeMultiplier: previewSizeMultiplier,
                  }}
                >
                  Download
                </CertificateDownload>
              </Flex>
              )
             }

              
            </Flex>
          )}
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
              {loading ? (
                <Flex w='100%' h='100%' alignItems='center' justify='center'>
                  <Spinner
                    w='8rem'
                    h='8rem'
                    alignSelf='center'
                    color='brand.mainTeal'
                    thickness='0.6rem'
                  />
                </Flex>
              ) : (
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
                    <Flex>{certificateData?.certificateId}</Flex>
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
                    <Flex>{certificateData?.certificateName}</Flex>
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
                    <Flex>{certificateData?.course}</Flex>
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
                    <Flex>{certificateData?.grade}</Flex>
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
                    <Flex>{certificateData?.issuedBy}</Flex>
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
                    <Flex>{certificateData?.createdDate}</Flex>
                  </Flex>
                </Flex>
              )}
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
              {loading ? (
                <Flex w='100%' h='100%' alignItems='center' justify='center'>
                  <Spinner
                    w='8rem'
                    h='8rem'
                    alignSelf='center'
                    color='brand.mainTeal'
                    thickness='0.6rem'
                  />
                </Flex>
              ) : (
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
                    <Flex>{blockchainData?.blockNumber}</Flex>
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
                      href={`https://sepolia.etherscan.io/tx/${blockchainData?.transactionHash}`}
                      target='_blank'
                      textAlign='center'
                      fontWeight='normal'
                      color='#0AE8FD'
                    >
                      {blockchainData?.transactionHash}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex h='full' w='full' align='center' justify='center'>
          <Text color='white' fontSize={{ base: '2rem' }} fontWeight='bold'>
            Certificate Not found
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Certificate;
