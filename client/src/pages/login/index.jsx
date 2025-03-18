import { Button, chakra, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { LoginInput, PasswordInput } from '../../components';
import { IoMdLock, IoMdMail } from 'react-icons/io';
import { SLogo } from '../../assets';
import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../contexts/authContext';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const authentication = useAuthentication();

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const response = await axiosInstance.post(`user/login`, {
        email,
        password,
      });

      if (response?.data?.status === 'success') {
        toast({
          title: 'success',
          description: response?.data?.message || 'Login Successfull',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });

        const token = response?.data?.token;
        const user = response?.data?.user;

        authentication.loginIn(token, user, () => {
          navigate('/user/dashboard');
        });
        setBtnLoading(false);
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'FError While Login',
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
                User Login
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
              <PasswordInput
                // type='password'
                id='password'
                placeholder='Password'
                iconColor='#00000099'
                iconLeft={IoMdLock}
                bgColor='brand.white'
                isRequired
                mb='5'
                show={show}
                handleClick={handleClick}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Flex as={Link} to='/forgot' w='full' justifyContent='flex-end'>
                <Button variant='unstyled' color='brand.mainBg'>
                  Forgot Password ?
                </Button>
              </Flex>
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
                w='full'
                mt='4'
                _hover={{ bg: '#6D99A1' }}
                isLoading={btnLoading}
                loadingText='Loggin in..'
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
