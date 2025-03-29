import { Button, chakra, Flex, Heading } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import axiosInstance from '../../config/axiosInstance';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const VerifyCertificate = () => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [certificateId, setCertificateId] = useState('');
  const [institutionId, setInstitutionId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getCompanyDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  const getCompanyDetails = async () => {
    try {
      const { data, status, statusText } =
        await axiosInstance.get(`institution/getAll`);

      if (status === 200 && statusText === 'OK') {
        setCompanyDetails(data?.institutions);
        console.log(data?.institutions);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/certificate?cId=${certificateId}&iId=${institutionId}`);
  };
  return (
    <Flex w='100%' h='100vh'>
      <Flex
        w='100%'
        h='100%'
        direction='row'
        alignItems='center'
        p='8'
        gap='10'
      >
        <Flex w='full' h='full' alignItems='center' justify='center'>
          <Flex w='40rem' h='30rem' justify='center' direction='column' gap='5'>
            <Heading color='#3FAABF'>Verify Certificate</Heading>
            <Flex
              as={chakra.form}
              direction='column'
              gap='4'
              onSubmit={handleSubmit}
            >
              <FormInput
                label='Certificate ID'
                id='certificateId'
                type='text'
                isRequired={true}
                w='90%'
                labelColor='brand.white'
                onChange={(e) => setCertificateId(e.target.value)}
              />
              <SelectInput
                id='institutionDetails'
                name='institutionDetails'
                validator={{
                  required: 'Choose a institution',
                }}
                w='90%'
                options={companyDetails.map((item) => ({
                  label: item.institutionName,
                  value: item.iId,
                }))}
                optionProps={{
                  background: '#0996A1',
                  color: '#ffffff',
                }}
                onChange={(e) => setInstitutionId(e.target.value)}
              >
                Select Institution
              </SelectInput>
              <Button
                variant='solid'
                bg='#3FAABF'
                color='white'
                justify-content='center'
                align-items='center'
                borderRadius='1rem'
                fontSize='1.125rem'
                fontWeight='bold'
                type='submit'
                w='90%'
                mt='4'
                _hover={{ bg: '#6D99A1' }}
              >
                Verify
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyCertificate;
