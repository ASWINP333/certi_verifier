import { Divider, Flex, Image, Text } from '@chakra-ui/react';
import { SLogo } from '../../assets';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const DesktopSidebar = () => {
  const user = getItemFromLocalStorage('user');
  return (
    <Flex w='16rem' h='100vh' bg='brand.sidebarMainBg'>
      <Flex direction='column' alignItems='center' gap='10'>
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
            <Link>
              <Text color='brand.white'>Dashboard</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.mainTeal' />
          </Flex>
        </Flex>
        <Flex color='brand.mainTeal' alignItems='center' mt='32'>
          <MdOutlineLogout size='2rem' />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DesktopSidebar;
