import {
  Button,
  chakra,
  Flex,
  HStack,
  Image,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import { SLogo } from '../../assets';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const { search } = useLocation();
  const email = new URLSearchParams(search).get('email');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/verify`,
        {
          email,
          otp,
        }
      );

      if (response.data.status === 'success') {
        console.log(response.data.message);
        toast.success(response?.data?.message);
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
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
                OTP Verification
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
              <HStack>
                <PinInput otp value={otp} onChange={setOtp}>
                  <PinInputField
                    bgColor='brand.white'
                    borderColor='brand.mainBg'
                  />
                  <PinInputField
                    bgColor='brand.white'
                    borderColor='brand.mainBg'
                  />
                  <PinInputField
                    bgColor='brand.white'
                    borderColor='brand.mainBg'
                  />
                  <PinInputField
                    bgColor='brand.white'
                    borderColor='brand.mainBg'
                  />
                  <PinInputField
                    bgColor='brand.white'
                    borderColor='brand.mainBg'
                  />
                  <PinInputField
                    bgColor='brand.white'
                    borderColor='brand.mainBg'
                  />
                </PinInput>
              </HStack>
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
                  Back
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
      <ToastContainer position='top-center' theme='dark' />
    </Flex>
  );
};

export default VerifyOtp;
