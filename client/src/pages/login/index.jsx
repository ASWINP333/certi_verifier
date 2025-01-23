import { Button, chakra, Flex, Text } from '@chakra-ui/react';
import { LoginInput } from '../../components';
import { IoMdLock, IoMdMail } from 'react-icons/io';

const Login = () => {
  return (
    <Flex w='100dvw' h='100dvh' overflowX='hidden' overflowY='hidden'>
      <Flex w='100%' h='100%'>
        <Flex w='44%' h='100%'></Flex>
        <Flex
          w='55%'
          h='100%'
          bg='brand.secondaryBg'
          justify='center'
          alignItems='center'
        >
          <Flex
            direction='column'
            gap='8'
            p='2'
            w={{ base: '100%', md: '30rem' }}
          >
            <Flex
              direction='column'
              alignItems='center'
              justifyContent='center'
              w='full'
              h='full'
            >
              <Text
                fontSize={{ base: 'xl', lg: '4xl' }}
                textAlign='justify'
                fontWeight='bold'
                color='#000000CC'
              >
                Welcome Back
              </Text>
              <Text
                fontSize='xl'
                textAlign='justify'
                fontWeight='medium'
                color='#000000CC'
              >
                Please enter your details to sign in
              </Text>
            </Flex>
            <Flex
              flexDir='column'
              alignItems='center'
              justifyContent='center'
              as={chakra.form}
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
              />
              <LoginInput
                type='password'
                id='password'
                placeholder='Password'
                iconColor='#00000099'
                icon={IoMdLock}
                bgColor='brand.white'
                isRequired
                mb='5'
              />
              <Button
                variant='solid'
                bg='#2A5158'
                color='white'
                justify-content='center'
                align-items='center'
                borderRadius='0.7rem'
                fontSize='1.125rem'
                fontWeight='bold'
                type='submit'
                w='full'
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