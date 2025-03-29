import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreateCertificate = () => {
  const [cId, setCId] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [certificateName, setCertificateName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');
  const [template, setTemplate] = useState('');
  const [loading, setloading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getTemplates();

    return () => {
      isMounted = false;
    };
  }, []);

  const getTemplates = async () => {
    try {
      const { data, status, statusText } =
        await axiosInstance.get(`template/getAll`);

      if (status === 200 && statusText === 'OK') {
        setTemplates(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const certificateData = {
        cId: cId,
        candidateName: candidateName,
        certificateName: certificateName,
        course: course,
        grade: grade,
        templateId: template,
      };

      console.log(certificateData);

      const response = await axiosInstance.post(
        `certificate/create`,
        certificateData
      );

      if (response.status === 201) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Certificate Created successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setloading(false);
        navigate('/user/certificates');
      }
    } catch (error) {
      setloading(false);

      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to create Certificate',
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
          CREATE CERTIFICATE
        </Heading>

        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
        >
          <Flex w='full'>
            <FormInput
              label='Certificate Id'
              id='cId'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setCId(e.target.value)}
            />
            <FormInput
              label='Candidate Name'
              id='candidateName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Certificate Name'
              id='certificateName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setCertificateName(e.target.value)}
            />
            <FormInput
              label='Course'
              id='course'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setCourse(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Grade'
              id='grade'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.white'
              onChange={(e) => setGrade(e.target.value)}
            />
            <SelectInput
              id='institutionDetails'
              name='institutionDetails'
              validator={{
                required: 'Choose a institution',
              }}
              w='90%'
              options={templates.map((item) => ({
                label: item?.templateName,
                value: item?._id,
              }))}
              optionProps={{
                background: '#0996A1',
                color: '#ffffff',
              }}
              onChange={(e) => setTemplate(e.target.value)}
            >
              Select Template
            </SelectInput>
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
                navigate('/user/certificates');
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

export default CreateCertificate;
