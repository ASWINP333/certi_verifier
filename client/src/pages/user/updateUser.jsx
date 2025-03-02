import { Button, chakra, Flex, Text } from '@chakra-ui/react';
import { FormInput } from '../../components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UpdateUser = ({ onClose, Idata }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [institutionName, setInstitutionName] = useState(
    Idata?.institutionName || ''
  );
  const [address, setAddress] = useState(Idata?.address || '');

  // Ensure state updates if Idata changes dynamically
  useEffect(() => {
    setInstitutionName(Idata?.institutionName || '');
    setAddress(Idata?.address || '');
  }, [Idata]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const updatedData = {
        institutionName: institutionName || Idata?.institutionName,
        address: address || Idata?.address,
      };

      const response = await axios.put(
        `http://localhost:4000/api/v1/institution/update/${Idata?.iId}`,
        updatedData
      );

      if (response.status === 200) {
        toast.success(
          response?.data?.message || 'Institution updated successfully'
        );
        setBtnLoading(false);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setBtnLoading(false);
      toast.error(
        error?.response?.data?.message || 'Failed to update institution'
      );
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
        Update Institution
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Institution Name'
          id='institutionName'
          type='text'
          isRequired={true}
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
        />
        <FormInput
          label='Address'
          id='address'
          type='text'
          isRequired={true}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
      <ToastContainer position='top-center' theme='dark' autoClose={2000} />
    </Flex>
  );
};

UpdateUser.propTypes = {
  Idata: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateUser;
