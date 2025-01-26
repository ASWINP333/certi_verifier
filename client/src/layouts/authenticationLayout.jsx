import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import { MainBg } from '../assets';

const AuthenticationLayout = () => {
  return (
    <Flex
      gap='4'
      w='100vw'
      minH='100vh'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
      backgroundImage={`url(${MainBg})`}
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default AuthenticationLayout;
