import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput, FileUploadInput } from '../../components';
import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateTemplate = () => {
  const [templateId, setTemplateId] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [file, setFile] = useState(null); // Store selected file
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('templateId', templateId);
      formData.append('templateName', templateName);
      formData.append('templateImage', file);

      const response = await axiosInstance.post('template/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description:
            response?.data?.message || 'Template Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setLoading(false);
        navigate('/user/templates');
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error',
        description:
          error?.response?.data?.message || 'Failed to create Template',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

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
          CREATE TEMPLATE
        </Heading>

        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
          encType='multipart/form-data' // Ensure correct encoding
        >
          <Flex w='full'>
            <FormInput
              label='Template ID'
              id='templateId'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setTemplateId(e.target.value)}
            />
            <FormInput
              label='Template Name'
              id='templateName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setTemplateName(e.target.value)}
            />
          </Flex>

          {/* File Upload Input */}
          <Flex direction='column' gap='2' w='full'>
            <FileUploadInput
              label='Upload Template'
              id='templateImage'
              isRequired={true}
              labelColor='brand.white'
              onFileChange={(file) => setFile(file)} // Update file state
            />
          </Flex>

          <Flex w='95%' justify='space-between'>
            <Button
              w='48%'
              type='button'
              bg={'#EEB82D'}
              color='black'
              mt='4'
              px={{ base: '4', md: '6' }}
              _hover={{ bg: 'yellow.300' }}
              borderRadius='0.7rem'
              size='sm'
              onClick={() => {
                navigate('/user/templates');
              }}
            >
              Back
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
              isLoading={loading}
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateTemplate;
