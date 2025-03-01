import {
  Button,
  chakra,
  Flex,
  Heading,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FormInput } from '../../components';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CreateInstition = () => {
  const [iId, setIId] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const institutionData = {
        institutionName: institutionName,
        address: address,
        iId: iId,
      };

      const response = await axios.post(
        `http://localhost:4000/api/v1/institution/create`,
        institutionData
      );

      if (response.status === 201) {
        toast.success(
          response?.data?.message || 'Institution Created successfully'
        );
        setloading(false);
        navigate('/user/institutions');
      }
    } catch (error) {
      setloading(false);
      toast.error(
        error?.response?.data?.message || 'Failed to create institution'
      );
    }
  };

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
          CREATE INSTITUTE
        </Heading>

        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
        >
          <Flex w='full'>
            <FormInput
              label='Institution Id'
              id='iId'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setIId(e.target.value)}
            />
            <FormInput
              label='Institution Name'
              id='institutionname'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setInstitutionName(e.target.value)}
            />
          </Flex>
          <Flex direction='column' gap='2' w='full'>
            <Text color='brand.white'>Address</Text>
            <Textarea
              size='sm'
              borderColor='brand.mainTeal'
              w='95%'
              color='brand.white'
              onChange={(e) => setAddress(e.target.value)}
            />
          </Flex>
          <Flex w='95%' justify='space-between'>
            <Button
              w='48%'
              type='button'
              bg={'#EEB82D'}
              color='black'
              mt='4'
              px={{ base: '4', md: '6' }}
              _hover={{ bg: 'yellow.300' }}
              borderRadius='0.7rem'
              size='sm'
              onClick={()=>{
                navigate('/user/institutions')
              }}
            >
              Back
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
              isLoading={loading}
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <ToastContainer position='top-center' theme='dark' autoClose={2000} />
    </Flex>
  );
};

export default CreateInstition;
