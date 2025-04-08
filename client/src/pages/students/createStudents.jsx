import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const CreateStudent = () => {
  const user = getItemFromLocalStorage('user');
  const [btnLoading, setBtnLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [courseDetails, setCourseDetails] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const instData = user?.institutionDetailsData?._id?.toString() || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        enrollmentNumber,
        institutionDetails: instData,
        courseDetails,
      };

      const response = await axiosInstance.post(`student/create`, userData);

      if (response.status === 201) {
        toast({
          title: 'success',
          description: response?.data?.message || 'User Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        navigate('/user/students');
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to create user',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
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
          CREATE STUDENT
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
              label='First Name'
              id='firstName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              label='Last Name'
              id='lastName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setlastName(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Email'
              id='email'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label='Phone Number'
              id='phoneNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='E Number'
              id='enrollmentNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setEnrollmentNumber(e.target.value)}
            />
            <SelectInput
              id='courseDetails'
              name='courseDetails'
              validator={{
                required: 'Choose a course',
              }}
              w='90%'
              options={[
                {
                  label: 'MCA',
                  value: 'MCA',
                },
                {
                  label: 'BCA',
                  value: 'BCA',
                },
                {
                  label: 'IMCA',
                  value: 'IMCA',
                },
              ]}
              optionProps={{
                background: '#0996A1',
                color: '#ffffff',
              }}
              onChange={(e) => setCourseDetails(e.target.value)}
            >
              Course
            </SelectInput>
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
              onClick={() => {
                navigate('/user/institutions');
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
              isLoading={btnLoading}
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateStudent;
