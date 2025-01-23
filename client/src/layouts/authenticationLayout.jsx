import { Flex } from '@chakra-ui/react';

import { Outlet } from 'react-router-dom';
import { Footer } from '../components';

const AuthenticationLayout = () => {
  return (
    <Flex
      gap='4'
      w='100vw'
      minH='100vh'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      bg='brand.mainBg'
      overflow='hidden'
    >
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default AuthenticationLayout;