import { Button, chakra, Flex, Image, Text } from '@chakra-ui/react';
import { LoginInput, PasswordInput } from '../../components';
import { IoMdLock, IoMdMail } from 'react-icons/io';
import { SLogo } from '../../assets';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/login`,
        {
          email,
          password,
        }
      );

      if (response.data.status === 'success') {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
              <Flex w='full' justifyContent='flex-end'>
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
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ToastContainer position='top-center' theme='dark' />
    </Flex>
  );
};

export default Login;
