import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import { FormInput } from '../../components';
import axiosInstance from '../../config/axiosInstance';
import { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateCertificate = ({ onClose, data }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [candidateName, setCandidateName] = useState(data?.candidateName || '');
  const [certificateName, setCertificateName] = useState(
    data?.certificateName || ''
  );
  const [course, setCourse] = useState(data?.course || '');
  const [grade, setGrade] = useState(data?.grade || '');

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const updatedData = {
        candidateName: candidateName || data?.candidateName,
        certificateName: certificateName || data?.certificateName,
        course: course || data?.course,
        grade: grade || data?.grade,
        status: 'pending',
      };

      const response = await axiosInstance.put(
        `certificate/update/${data?.cId}`,
        updatedData
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Certificate Updated successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setBtnLoading(false);
        onClose();
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to update Certificate',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

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
      <Text color='brand.mainTeal' fontSize='1.5rem' fontWeight='semibold'>
        Update Certificate
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Certificate Id'
          id='cId'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={data?.cId}
          isDisabled
        />
        <FormInput
          label='Candidate Name'
          id='candidateName'
          type='text'
          isRequired={true}
          value={candidateName}
          labelColor='brand.white'
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <FormInput
          label='Certificate Name'
          id='certificateName'
          type='text'
          isRequired={true}
          value={certificateName}
          labelColor='brand.white'
          onChange={(e) => setCertificateName(e.target.value)}
        />
        <FormInput
          label='Course'
          id='course'
          type='text'
          isRequired={true}
          value={course}
          labelColor='brand.white'
          onChange={(e) => setCourse(e.target.value)}
        />
        <FormInput
          label='Grade'
          id='grade'
          type='text'
          isRequired={true}
          value={grade}
          labelColor='brand.white'
          onChange={(e) => setGrade(e.target.value)}
        />
        <Flex w='full' justify='space-between'>
          <Button
            w='48%'
            type='button'
            bg={'#EEB82D'}
            color='black'
            mt='4'
            px={{ base: '4', md: '6' }}
            onClick={onClose}
            _hover={{ bg: 'yellow.300' }}
            borderRadius='0.7rem'
            size='sm'
          >
            Cancel
          </Button>
          <Button
            w='48%'
            px={{ base: '4', md: '6' }}
            bg='brand.mainTeal'
            color='brand.white'
            type='submit'
            mt='4'
            _hover={{ bg: 'green.400' }}
            borderRadius='0.7rem'
            size='sm'
            isLoading={btnLoading}
            loadingText='Updating'
            spinnerPlacement='start'
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

UpdateCertificate.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateCertificate;
