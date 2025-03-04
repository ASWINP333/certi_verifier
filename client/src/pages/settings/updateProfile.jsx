import { Button, chakra, Flex, Text } from '@chakra-ui/react';
import { FormInput } from '../../components';
import PropTypes from 'prop-types';

const UpdateProfile = ({ onClose, data }) => {
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
        Update Profile
      </Text>
      <Flex as={chakra.form} w='100%' direction='column' gap='6'>
        <FormInput
          label='Email'
          id='email'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          isDisabled
          value={data?.email}
          //   onChange={(e) => setInstitutionName(e.target.value)}
        />
        <FormInput
          label='First Name'
          id='firstName'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={data?.firstName}
          //   onChange={(e) => setAddress(e.target.value)}
        />
        <FormInput
          label='Last Name'
          id='lastName'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={data?.lastName}
          //   onChange={(e) => setAddress(e.target.value)}
        />
        <FormInput
          label='Phone Number'
          id='phoneNumber'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={data?.phoneNumber}
          //   onChange={(e) => setAddress(e.target.value)}
        />
        <FormInput
          label='Designation'
          id='designation'
          type='text'
          isRequired={true}
          labelColor='brand.white'
          value={data?.designation}
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

UpdateProfile.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateProfile;
