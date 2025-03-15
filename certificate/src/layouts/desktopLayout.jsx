import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import { MainBg } from '../assets';

const DesktopLayout = () => {
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
      <Flex w='100%' h='100%'>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default DesktopLayout;
