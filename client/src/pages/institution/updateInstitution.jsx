import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import { FormInput } from '../../components';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInstitution } from '../../apis/institutionApis';

const UpdateInstitution = ({ onClose, Idata }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [institutionName, setInstitutionName] = useState(
    Idata?.institutionName || ''
  );
  const [address, setAddress] = useState(Idata?.address || '');

  const toast = useToast();

  const queryClient = useQueryClient();

  // Ensure state updates if Idata changes dynamically
  useEffect(() => {
    setInstitutionName(Idata?.institutionName || '');
    setAddress(Idata?.address || '');
  }, [Idata]);

  const mutatedData = useMutation({
    mutationFn: (id, updatedInstitution) => {
      return updateInstitution(id, updatedInstitution);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['institutions'] }),
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const updatedData = {
        institutionName: institutionName || Idata?.institutionName,
        address: address || Idata?.address,
      };

      const { data, status, statusText } = await mutatedData.mutateAsync({
        id: Idata?.iId,
        updatedData,
      });

      if (status === 200 && statusText === 'OK') {
        toast({
          title: 'success',
          description:
            data?.data?.message || 'Institution updated successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        onClose();
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to update institution',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

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
        Update Institution
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Institution Name'
          id='institutionName'
          type='text'
          isRequired={true}
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
          labelColor='brand.white'
        />
        <FormInput
          label='Address'
          id='address'
          type='text'
          isRequired={true}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          labelColor='brand.white'
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
            isLoading={btnLoading}
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

UpdateInstitution.propTypes = {
  Idata: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateInstitution;
