import { Divider, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import { SLogo } from '../../assets';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { getItemFromLocalStorage } from '../../functions/localStorage';
import MainModal from '../modals/MainModal';
import Logout from './logout';

const DesktopSidebar = () => {
  const user = getItemFromLocalStorage('user');
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex w='16rem' h='100vh' bg='brand.sidebarMainBg'>
      <Flex
        direction='column'
        alignItems='center'
        justifyContent='space-between'
      >
        <Link to='/user/dashboard'>
          <Image src={SLogo} alt='Secondary Logo' />
        </Link>
        <Flex
          w='8rem'
          h='5rem'
          direction='column'
          color='brand.mainTeal'
          rounded='0.8rem'
          border='1px solid'
          borderColor='brand.mainTeal'
          alignItems='center'
          justify='center'
          gap='2'
        >
          <FaRegUser size='1.5rem' />
          <Text
            color='brand.white'
            fontSize='1.2rem'
            fontWeight='bold'
            textTransform='uppercase'
          >
            {user?.firstName}
          </Text>
        </Flex>
        <Flex direction='column' alignItems='center' gap='5'>
          <Flex direction='column' alignItems='center' gap='6'>
            <Link to='/user/dashboard'>
              <Text color='brand.white'>Dashboard</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/institutions'>
              <Text color='brand.white'>Institutions</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/users'>
              <Text color='brand.white'>Users List</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/certificates'>
              <Text color='brand.white'>Certificates</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/report'>
              <Text color='brand.white'>Report</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/settings'>
              <Text color='brand.white'>Settings</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
        </Flex>
        <Flex
          color='brand.mainTeal'
          alignItems='center'
          cursor='pointer'
          onClick={onOpen}
          mb='4'
        >
          <MdOutlineLogout size='2rem' />
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <Logout onClose={onClose} />
      </MainModal>
    </Flex>
  );
};

export default DesktopSidebar;
