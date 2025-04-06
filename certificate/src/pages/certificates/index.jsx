import { Button, Flex, Heading, Link, Spinner } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { getItemFromLocalStorage } from '../../functions/localStorage';
import { SimpleTableComponent } from '../../components';

const Certificates = () => {
  const user = getItemFromLocalStorage('student-user');
  const certificates = user?.certificates;
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCertificates(certificates);
  }, []);

  const getMyCertificates = async (certificates) => {
    try {
      const certData = [];

      for (const certificate of certificates) {
        const { data, status, statusText } = await axiosInstance.get(
          `certificate/get/${certificate}`
        );

        if (status === 200 && statusText === 'OK') {
          certData.push(data?.certificate);
        }
      }

      setCertificateData(certData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'cId',
      },
      {
        Header: 'Candidate Name',
        accessor: 'candidateName',
      },
      {
        Header: 'Certificate Name',
        accessor: 'certificateName',
      },
      {
        Header: 'Institution Name',
        accessor: (row) => row?.institutionDetails?.institutionName || 'N/A',
      },
      {
        Header: 'Actions',
        accessor: (cell) => (
          <Flex alignItems='center' justify='center' p='0'>
            <Button
              as={Link}
              href={`/certificate?cId=${cell?.cId}&iId=${cell?.institutionDetails?.iId}`}
              target='_blank'
              variant='unstyled'
              bg='transparent'
              color='brand.white'
              _hover={{ bg: 'transparent' }}
            >
              View
            </Button>
          </Flex>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Flex w='100dvw' h='100dvh' overflowX='hidden' overflowY='hidden'>
      <Flex w='100%' h='100%' direction='column' p='10'>
        <Heading color='brand.mainTeal' textTransform='uppercase'>
          Certificates
        </Heading>
        {loading ? (
          <Flex w='100%' h='100%' alignItems='center' justify='center'>
            <Spinner
              w='8rem'
              h='8rem'
              alignSelf='center'
              color='brand.mainTeal'
              thickness='0.6rem'
            />
          </Flex>
        ) : (
          <Flex w='100%' h='100%' p='10'>
            <SimpleTableComponent
              columns={columns}
              data={certificateData}
              isPagination={true}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Certificates;
