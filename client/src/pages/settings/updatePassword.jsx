import { Button, chakra, Flex, Text } from '@chakra-ui/react';
import { FormInput } from '../../components';
import PropTypes from 'prop-types';

const UpdatePassword = ({ onClose }) => {
  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='4'
      p='5'
    >
      <Text color='brand.mainTeal' fontSize='1.5rem' fontWeight='semibold'>
        Update Password
      </Text>
      <Flex as={chakra.form} w='100%' direction='column' gap='6'>
        <FormInput
          label='Current Password'
          id='currentPassword'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          //   onChange={(e) => setAddress(e.target.value)}
        />
        <FormInput
          label='New Password'
          id='newPassword'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          //   onChange={(e) => setAddress(e.target.value)}
        />
        <FormInput
          label='Confirm Password'
          id='confirmPassword'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          //   onChange={(e) => setAddress(e.target.value)}
        />
        <Flex w='full' justify='space-between'>
          <Button
            w='48%'
            type='button'
            bg={'#EEB82D'}
            color='black'
            mt='4'
            px={{ base: '4', md: '6' }}
            onClick={onClose}
            _hover={{ bg: 'yellow.300' }}
            borderRadius='0.7rem'
            size='sm'
          >
            Cancel
          </Button>
          <Button
            w='48%'
            px={{ base: '4', md: '6' }}
            bg='brand.mainTeal'
            color='brand.white'
            type='submit'
            mt='4'
            _hover={{ bg: 'green.400' }}
            borderRadius='0.7rem'
            size='sm'
            // isLoading={btnLoading}
            loadingText='Updating'
            spinnerPlacement='start'
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

UpdatePassword.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default UpdatePassword;
