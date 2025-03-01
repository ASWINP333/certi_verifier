import { Button, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteInstitution = ({ onClose, id }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:4000/api/v1/institution/delete/${id}`
      );

      if (response.status === 200) {
        toast.success(
          response?.data?.message || 'Institution deleted successfully'
        );
        setLoading(false);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Failed to delete institution'
      );
      setLoading(false);
    }
  };

  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='2'
    >
      <Flex>
        <Text fontSize={{ base: '1.2rem' }}>
          Are you sure you want to delete?
        </Text>
      </Flex>
      <Flex gap='4' alignSelf='flex-end' mt='4'>
        <Button
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
          px={{ base: '4', md: '6' }}
          bg='brand.mainTeal'
          color='brand.white'
          type='button'
          mt='4'
          _hover={{ bg: 'green.400' }}
          borderRadius='0.7rem'
          size='sm'
          onClick={handleDelete}
          isLoading={loading}
          loadingText='Deleting'
          spinnerPlacement='start'
        >
          Confirm
        </Button>
      </Flex>
      <ToastContainer position='top-center' theme='dark' autoClose={2000} />
    </Flex>
  );
};

DeleteInstitution.propTypes = {
  id: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteInstitution;
