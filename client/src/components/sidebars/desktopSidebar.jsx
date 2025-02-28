import { Divider, Flex, Image, Text } from '@chakra-ui/react';
import { SLogo } from '../../assets';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';

const DesktopSidebar = () => {
  return (
    <Flex w='16rem' h='100vh' bg='brand.sidebarMainBg'>
      <Flex direction='column' alignItems='center' gap='10'>
        <Image src={SLogo} alt='Secondary Logo' />
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
        >
          <FaRegUser />
          <Text>ADMIN</Text>
        </Flex>
        <Flex direction='column' alignItems='center' gap='4'>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link>
              <Text color='brand.white'>Dashboard</Text>
            </Link>
            <Divider w='12rem' colorScheme='teal' th />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link>
              <Text color='brand.white'>Dashboard</Text>
            </Link>
            <Divider w='12rem' colorScheme='teal' th />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link>
              <Text color='brand.white'>Dashboard</Text>
            </Link>
            <Divider w='12rem' colorScheme='teal' th />
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
