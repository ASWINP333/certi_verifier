import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const CreateUser = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [institutionData, setInstitutionData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [institutionDetails, setInstitutionDetails] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

  const user = getItemFromLocalStorage('user');
  const role = user?.role;

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // You can adjust this to your country format
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phoneNumber)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number.',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    try {
      setBtnLoading(true);

      const userRole =
        role === 'Admin' ? 'Owner' : role === 'Owner' ? 'Staff' : '';

      const instData = user?.institutionDetailsData?._id?.toString() || '';

      const institutionId = role === 'Owner' ? instData : '';

      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        designation,
        institutionDetails:
          institutionDetails === '' ? institutionId : institutionDetails,
        role: userRole,
      };

      const response = await axiosInstance.post(`user/create`, userData);

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
        navigate('/user/users');
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

  useEffect(() => {
    getInstitutionData();
  }, []);

  const getInstitutionData = async () => {
    try {
      const response = await axiosInstance.get(`institution/getAll`);
      if (response.data.status === 'success') {
        console.log(response.data.institutions);
        setInstitutionData(response.data.institutions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex w='100%' h='100vh' bg={'brand.bg'}>
      <Flex
        w='100%'
        h='100%'
        direction='column'
        alignItems='center'
        p='10'
        gap='12'
      >
        <Heading color='brand.mainTeal' textTransform='uppercase'>
          CREATE USER
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
              type='email'
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
              label='Designation'
              id='designation'
              type='text'
              isRequired={true}
              w={role === 'Admin' ? '90%' : '45%'}
              labelColor='brand.white'
              onChange={(e) => setDesignation(e.target.value)}
            />
            {role === 'Admin' && (
              <SelectInput
                id='institutionDetails'
                name='institutionDetails'
                validator={{
                  required: 'Choose a institution',
                }}
                w='90%'
                options={institutionData.map((item) => ({
                  label: item?.institutionName,
                  value: item?._id,
                }))}
                optionProps={{
                  background: '#0996A1',
                  color: '#ffffff',
                }}
                onChange={(e) => setInstitutionDetails(e.target.value)}
              >
                institutionDetails
              </SelectInput>
            )}
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
                navigate('/user/users');
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

export default CreateUser;
