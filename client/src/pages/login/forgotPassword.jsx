import { Button, chakra, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { LoginInput } from '../../components';
import { IoMdMail } from 'react-icons/io';
import { SLogo } from '../../assets';
import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post(`user/forgot`, {
        email,
      });

      if (response.data.status === 'success') {
        toast({
          title: 'success',
          description: response?.data?.message,
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setLoading(false);
        navigate(`/otp-verify?email=${email}`);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Error While forgot password',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  return (
    <Flex w='100dvw' h='100dvh' overflowX='hidden' overflowY='hidden'>
      <Flex w='100%' h='100%' alignItems='center' justify='center'>
        <Flex
          w='30rem'
          h='40rem'
          shadow='2xl'
          borderRadius='1rem'
          overflow='hidden'
          direction='column'
        >
          <Flex w='100%' h='40%'>
            <Image src={SLogo} w='100%' h='100%' />
          </Flex>
          <Flex
            w='100%'
            h='60%'
            bg='brand.secondaryBg'
            alignItems='center'
            justify='center'
            direction='column'
          >
            <Flex h='4rem'>
              <Text
                mb='4'
                fontSize='2rem'
                fontWeight='bold'
                textTransform='uppercase'
                fontFamily='sans-serif'
                color='brand.white'
              >
                Forgot Password
              </Text>
            </Flex>
            <Flex
              flexDir='column'
              alignItems='center'
              justifyContent='center'
              as={chakra.form}
              w='90%'
              mb='16'
              onSubmit={handleSubmit}
            >
              <LoginInput
                type='email'
                id='email'
                placeholder='Email'
                iconColor='#00000099'
                icon={IoMdMail}
                bgColor='brand.white'
                isRequired
                mb='5'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Flex w='full' justify='space-between'>
                <Button
                  as={Link}
                  to='/'
                  variant='solid'
                  bg='#222222'
                  color='white'
                  justify-content='center'
                  align-items='center'
                  borderRadius='0.7rem'
                  fontSize='1.125rem'
                  fontWeight='bold'
                  w='48%'
                  mt='4'
                  _hover={{ bg: '#6D99A1' }}
                >
                  Cancel
                </Button>
                <Button
                  variant='solid'
                  bg='#222222'
                  color='white'
                  justify-content='center'
                  align-items='center'
                  borderRadius='0.7rem'
                  fontSize='1.125rem'
                  fontWeight='bold'
                  type='submit'
                  w='48%'
                  mt='4'
                  _hover={{ bg: '#6D99A1' }}
                  isLoading={loading}
                  loadingText='Sending...'
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
