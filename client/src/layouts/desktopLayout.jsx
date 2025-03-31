import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DesktopSidebar, Footer } from '../components';
import { useThemeColors } from '../components/extras/colors';

const DesktopLayout = () => {
  const { dashboardBg } = useThemeColors();
  return (
    <Flex
      gap='4'
      w='100vw'
      minH='100vh'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
      bg={dashboardBg}
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Flex w='100%' h='100%'>
        <DesktopSidebar />
        <Outlet />
      </Flex>

      <Footer />
    </Flex>
  );
};

export default DesktopLayout;
