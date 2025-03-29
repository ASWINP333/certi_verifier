import {
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { getItemFromLocalStorage } from '../../functions/localStorage';
import { ColorModeSwitch, MainModal } from '../../components';
import UpdateProfile from './updateProfile';
import UpdatePassword from './updatePassword';
import { useThemeColors } from '../../components/extras/colors';

const Settings = () => {
  const user = getItemFromLocalStorage('user');

  const lighModeText = 'Light';
  const darkModeText = 'Dark';
  const colorModeText = useColorModeValue(lighModeText, darkModeText);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isModalPasswordOpen,
    onOpen: onModalPasswordOpen,
    onClose: onModalPasswordClose,
  } = useDisclosure();

  // Color
  const { mainCardBg, mainColor } = useThemeColors();

  return (
    <Flex w='100%' h='100vh'>
      <Flex
        w='100%'
        h='100%'
        direction='column'
        alignItems='center'
        p='10'
        gap='12'
      >
        <Heading color='brand.mainTeal' textTransform='uppercase'>
          SETTINGS
        </Heading>
        <Flex
          w='100%'
          h='100%'
          alignItems='center'
          justify='center'
          direction='column'
          gap='6'
        >
          <Flex
            border='2px solid'
            direction='column'
            justify='space-between'
            px={{ base: '4', md: '6' }}
            py={{ base: '4', md: '6' }}
            borderRadius='0.7rem'
            borderColor='brand.mainTeal'
            bg={mainCardBg}
          >
            <Flex w='50rem' h='6rem' justify='space-between'>
              <Flex direction='column' gap='4'>
                <Text color={mainColor} fontSize='1.2rem' fontWeight='semibold'>
                  Name
                </Text>
                <Text
                  color='brand.white'
                  fontSize='1.1rem'
                >{`${user?.firstName} ${user?.lastName}`}</Text>
              </Flex>
            </Flex>
            <Flex w='50rem' h='6rem' justify='space-between'>
              <Flex direction='column' gap='4'>
                <Text
                  color='brand.mainTeal'
                  fontSize='1.2rem'
                  fontWeight='semibold'
                >
                  Email
                </Text>
                <Text color='brand.white' fontSize='1.1rem'>
                  {user?.email}
                </Text>
              </Flex>
              <Button
                w='6rem'
                px={{ base: '4', md: '6' }}
                bg='brand.black'
                color='brand.white'
                type='submit'
                mt='4'
                _hover={{ bg: 'brand.mainTeal' }}
                borderRadius='0.7rem'
                size='sm'
                border='2px solid'
                borderColor='brand.mainTeal'
                onClick={onModalOpen}
              >
                Edit
              </Button>
            </Flex>
            <Flex w='50rem' h='6rem' justify='space-between'>
              <Flex direction='column' gap='4'>
                <Text
                  color='brand.mainTeal'
                  fontSize='1.2rem'
                  fontWeight='semibold'
                >
                  Password
                </Text>
                <Text color='brand.white' fontSize='1.1rem'>
                  ************
                </Text>
              </Flex>
              <Button
                w='6rem'
                px={{ base: '4', md: '6' }}
                bg='brand.black'
                color='brand.white'
                type='submit'
                mt='4'
                _hover={{ bg: 'brand.mainTeal' }}
                borderRadius='0.7rem'
                size='sm'
                border='2px solid'
                borderColor='brand.mainTeal'
                onClick={onModalPasswordOpen}
              >
                Edit
              </Button>
            </Flex>
            <Flex w='50rem' h='6rem' justify='space-between'>
              <Flex direction='column' gap='4'>
                <Text
                  color='brand.mainTeal'
                  fontSize='1.2rem'
                  fontWeight='semibold'
                >
                  Color Mode
                </Text>
                <Text color='brand.white' fontSize='1.1rem'>
                  {colorModeText}
                </Text>
              </Flex>
              <ColorModeSwitch mt='4' mx='6' />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateProfile onClose={onModalClose} data={user} />
      </MainModal>
      <MainModal
        isOpen={isModalPasswordOpen}
        onClose={onModalPasswordClose}
        bgColor='brand.dashboardBg'
      >
        <UpdatePassword onClose={onModalPasswordClose} />
      </MainModal>
    </Flex>
  );
};

export default Settings;
