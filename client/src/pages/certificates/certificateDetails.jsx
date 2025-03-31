import { Button, Flex, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoLink } from 'react-icons/go';
import axiosInstance from '../../config/axiosInstance';
import dayjs from 'dayjs';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const CertificateDetails = ({ data, onClose, loading }) => {
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [revokeLoading, setRevokingLoading] = useState(false);

  const user = getItemFromLocalStorage('user');

  const role = user?.role;
  const toast = useToast();

  const handleCertificateVerify = async (e) => {
    e.preventDefault();
    try {
      setVerifyLoading(true);
      const response = await axiosInstance.post(
        `certificate/verify/${data?.cId}`
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Certificate Verified successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setVerifyLoading(false);
        onClose();
      }
    } catch (error) {
      setVerifyLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to verify Certificate',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleCertificateRevoke = async (e) => {
    e.preventDefault();
    try {
      setRevokingLoading(true);
      const response = await axiosInstance.delete(
        `certificate/revoke/${data?.cId}`
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Certificate Revoked Successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setRevokingLoading(false);
        onClose();
      }
    } catch (error) {
      setRevokingLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to Revoked Certificate',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const link = `http://localhost:5174/certificate?cId=${data?.cId}&iId=${data?.institutionDetails?.iId}`;
  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='4'
      p='5'
    >
      {loading ? (
        <Spinner
          w='8rem'
          h='8rem'
          alignSelf='center'
          color='brand.mainTeal'
          thickness='0.6rem'
        />
      ) : (
        <>
          <Text color='brand.mainTeal' fontSize='1.5rem' fontWeight='semibold'>
            Certificate Details
          </Text>
          <Flex w='full' direction='column' gap='4'>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Certificate Id : </Text>
              <Text>{data?.cId}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>candidateName Name : </Text>
              <Text>{data?.candidateName}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Certificate Name : </Text>
              <Text>{data?.certificateName}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Institution Name: </Text>
              <Text>{data?.institutionDetails?.institutionName}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Course: </Text>
              <Text>{data?.course}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Grade: </Text>
              <Text>{data?.grade}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Issued By: </Text>
              <Text>{`${data?.issuedBy?.firstName} ${data?.issuedBy?.lastName}`}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Blockchain Status: </Text>
              <Text>{data?.status}</Text>
            </Flex>
            <Flex color='brand.white' gap='2' fontSize='1.1rem'>
              <Text>Created At: </Text>
              <Text>
                {dayjs(data?.createdAt).format('DD MMM YYYY, h:mm A')}
              </Text>
            </Flex>

            <Flex w='100%' alignItems='center' justify='space-between' mt='4'>
              <Flex
                as={Link}
                href={link}
                target='_blank'
                bg='brand.mainTeal'
                p='2'
                w='15rem'
                alignSelf='center'
                alignItems='center'
                justify='center'
                gap='2'
                borderRadius='1rem'
                color='brand.white'
              >
                View More Details
                <GoLink />
              </Flex>
              {(role === 'Admin' || role === 'Owner') && (
                <Flex alignItems='center' gap='2' color='brand.white'>
                  <Button
                    bg='green.300'
                    color='brand.white'
                    alignItems='center'
                    minW='5rem'
                    justify='center'
                    px='2'
                    py='1'
                    borderRadius='1rem'
                    onClick={handleCertificateVerify}
                    isLoading={verifyLoading}
                    loadingText='Loading..'
                    isDisabled={data?.status === 'pending' ? false : true}
                  >
                    Approve
                  </Button>
                  <Button
                    bg='red.400'
                    color='brand.white'
                    alignItems='center'
                    minW='5rem'
                    justify='center'
                    px='2'
                    py='1'
                    borderRadius='1rem'
                    onClick={handleCertificateRevoke}
                    isLoading={revokeLoading}
                    loadingText='Loading..'
                    isDisabled={data?.status === 'pending' ? false : true}
                  >
                    Reject
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

CertificateDetails.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default CertificateDetails;
