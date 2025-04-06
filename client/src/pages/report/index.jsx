import {
  Button,
  chakra,
  Flex,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { DateInput, FormInput, SimpleTableComponent } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import * as XLSX from 'xlsx';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const Report = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [course, setCourse] = useState('');

  const user = getItemFromLocalStorage('user');
  const role = user?.role;

  const toast = useToast();

  // Get the first day of the current month and the current day as the end date
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDay = new Date(); // Current day

    // Format date as YYYY-MM-DD
    const formatDate = (date) => date.toLocaleDateString('en-CA');

    return {
      startDate: formatDate(firstDay),
      endDate: formatDate(endDay),
    };
  };

  useEffect(() => {
    const { startDate, endDate } = getCurrentMonthRange();
    setStartDate(startDate);
    setEndDate(endDate);
    getUsersData(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsersData = async (start, end) => {
    try {
      setLoading(true);
      let endPoint;

      if (role === 'Owner') {
        endPoint = `certificate/get/date-course?startDate=${start}&endDate=${end}&course=${course}`;
      } else {
        endPoint = `certificate/get/date?startDate=${start}&endDate=${end}`;
      }

      const response = await axiosInstance.get(endPoint);
      if (
        response.data.status === 'success' &&
        response?.data?.certificates.length > 0
      ) {     
        setCertificateData(response?.data?.certificates);
      } else {
        toast({
          title: 'No Data',
          description: 'No certificates found for the selected date range.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setCertificateData([]); // Explicitly set an empty array to trigger re-render
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'no certificate found.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setCertificateData([]); // Clear data on error as well
    } finally {
      setLoading(false);
      setBtnLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      setBtnLoading(true);
      getUsersData(startDate, endDate);
    } else {
      toast({
        title: 'Invalid Dates',
        description: 'Please select both start and end dates.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'cId',
      },
      {
        Header: 'Institution Name',
        accessor: (row) => row?.institutionDetails?.institutionName || 'N/A',
      },
      {
        Header: 'Candidate Name',
        accessor: 'candidateName',
      },
      {
        Header: 'Course',
        accessor: 'course',
      },
      {
        Header: 'Grade',
        accessor: 'grade',
      },
      {
        Header: 'Certificate Name',
        accessor: 'certificateName',
      },
      {
        Header: 'status',
        accessor: 'status',
      },
    ],
    []
  );

  const downloadExcel = () => {
    if (certificateData.length === 0) {
      toast({
        title: 'No Data',
        description: 'There is no data to download.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(certificateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Certificates');

    XLSX.writeFile(workbook, 'Certificates_Report.xlsx');
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
          REPORT
        </Heading>
        <Flex w='100%' h='100%' direction='column'>
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
            <Flex mt='8' direction='column'>
              <Flex
                as={chakra.form}
                pos='absolute'
                onSubmit={handleSubmit}
                right='10'
                top='32'
                gap='4'
              >
                <DateInput
                  label='Start Date'
                  id='startDate'
                  value={startDate}
                  isRequired={true}
                  w='12rem'
                  labelColor='brand.white'
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <DateInput
                  label='End Date'
                  id='endDate'
                  value={endDate}
                  isRequired={true}
                  w='12rem'
                  labelColor='brand.white'
                  onChange={(e) => setEndDate(e.target.value)}
                />
               {
                role === 'Owner' && (
                  <FormInput
                  label='course'
                  id='course'
                  type='text'
                  isRequired={true}
                  w='12rem'
                  labelColor='brand.white'
                  onChange={(e) => setCourse(e.target.value)}
                />
                )
               }
                <Flex gap='2'>
                  <Button
                    w='10rem'
                    px={{ base: '4', md: '6' }}
                    bg='brand.mainTeal'
                    color='brand.white'
                    type='submit'
                    _hover={{ bg: 'green.400' }}
                    borderRadius='0.7rem'
                    size='sm'
                    mt='10'
                    isLoading={btnLoading}
                    loadingText='Loading...'
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
              {certificateData.length !== 0 ? (
                <SimpleTableComponent
                  columns={columns}
                  data={certificateData}
                  isPagination={true}
                />
              ) : (
                <Flex
                  justifyContent='center'
                  alignItems='center'
                  w='100%'
                  mt='4'
                  h='60vh'
                  color='brand.white'
                >
                  No Data found in the selected date
                </Flex>
              )}
              <Flex pos='absolute' bottom='40'>
                <Button
                  px={{ base: '4', md: '6' }}
                  border='2px solid'
                  bg='transparent'
                  borderColor='brand.mainTeal'
                  color='brand.white'
                  type='button'
                  _hover={{ borderColor: 'green.400' }}
                  borderRadius='0.6rem'
                  size='sm'
                  mt='10'
                  onClick={downloadExcel}
                >
                  Download as Exel
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Report;
