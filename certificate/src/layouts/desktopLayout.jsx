import { Flex, useDisclosure } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import { Footer, Logout, MainModal } from '../components';
import { MainBg } from '../assets';
import { MdOutlineLogout } from 'react-icons/md';
import { getItemFromLocalStorage } from '../functions/localStorage';
import { FaUser } from 'react-icons/fa';

const DesktopLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = getItemFromLocalStorage('student-user');
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
      pos='relative'
    >
      {user && (
        <Flex
          pos='absolute'
          right='2'
          top='6'
          color='brand.white'
          alignItems='center'
          gap='2'
          textTransform='capitalize'
          border='1px solid'
          borderColor='brand.white'
          py='2'
          px='4'
          borderRadius='2rem'
          cursor='pointer'
          onClick={onOpen}
        >
          LogOut
          <MdOutlineLogout size='1.2rem' />
        </Flex>
      )}

      {!user && (
        <Flex
          as={Link}
          to='/login'
          pos='absolute'
          right='4'
          top='6'
          color='brand.white'
          alignItems='center'
          gap='2'
          textTransform='capitalize'
          py='2'
          px='4'
          borderRadius='2rem'
          cursor='pointer'
        >
          <FaUser size='1.2rem' />
        </Flex>
      )}
      <Flex w='100%' h='100%'>
        <Outlet />
      </Flex>
      <Footer />
      <MainModal isOpen={isOpen} onClose={onClose}>
        <Logout onClose={onClose} />
      </MainModal>
    </Flex>
  );
};

export default DesktopLayout;
