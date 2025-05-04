import {
  Button,
  chakra,
  Flex,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';

import { DateInput, SelectInput, SimpleTableComponent } from '../../components';

import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import * as XLSX from 'xlsx';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const Report = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [institutionData, setInstitutionData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [course, setCourse] = useState('');
  const [institutionDetails, setInstitutionDetails] = useState('');

  const user = getItemFromLocalStorage('user');
  const role = user?.role;

  const toast = useToast();

  useEffect(() => {
    getInstitutionData();
  }, []);

  const getInstitutionData = async () => {
    try {
      const response = await axiosInstance.get(`institution/getAll`);
      if (response.data.status === 'success') {
        console.log(response.data.institutions);
        setInstitutionData(response.data.institutions);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const defCourse = 'MCA';
    getUsersData(startDate, endDate, defCourse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsersData = async (start, end, course) => {
    try {
      setLoading(true);
      let endPoint;

      if (role === 'Owner') {
        endPoint = `certificate/get/date-course?startDate=${start}&endDate=${end}&course=${course}`;
      } else {
        endPoint = `certificate/get/date?startDate=${start}&endDate=${end}`;
        // endPoint = `certificate/get/date-course?startDate=${start}&endDate=${end}&course=${course}`
      }

      const response = await axiosInstance.get(endPoint);
      if (
        response.data.status === 'success' &&
        response?.data?.certificates.length > 0
      ) {
        setCertificateData(response?.data?.certificates);
        const certificates = response?.data?.certificates;

        const formattedExcelData = certificates.map((cert) => ({
          'Certificate Id': cert.cId,
          'Candidate Name': cert.candidateName,
          Course: cert.course,
          Institution: cert.institutionDetails?.institutionName,
          'Certificate Name': cert.certificateName,
          'Issued By': `${cert.issuedBy?.firstName} ${cert.issuedBy?.lastName}`,
        }));

        setExcelData(formattedExcelData);
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
      getUsersData(startDate, endDate, course);
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
        Header: 'Candidate Name',
        accessor: 'candidateName',
      },
      {
        Header: 'Course',
        accessor: 'course',
      },
      {
        Header: 'Institution',
        accessor: (row) => row?.institutionDetails?.institutionName,
      },
      {
        Header: 'Certificate Name',
        accessor: 'certificateName',
      },
      {
        Header: 'Issued By',
        accessor: (row) =>
          `${row?.issuedBy?.firstName} ${row?.issuedBy?.lastName}`,
      },
      {
        Header: 'status',
        accessor: 'status',
      },
    ],
    []
  );

  const downloadExcel = () => {
    if (excelData.length === 0) {
      toast({
        title: 'No Data',
        description: 'There is no data to download.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Certificates');

    XLSX.writeFile(workbook, 'Certificates_Report.xlsx');
  };

  return (
    <Flex w='100%' h='100vh' bg={'brand.bg'}>
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
        {role !== 'Admin' ? (
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
                  <SelectInput
                    id='course'
                    name='course'
                    validator={{
                      required: 'Choose a course',
                    }}
                    w='12rem'
                    options={certificateData.map((item) => ({
                      label: item?.course,
                      value: item?.course,
                    }))}
                    optionProps={{
                      background: '#0996A1',
                      color: '#ffffff',
                    }}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    Course
                  </SelectInput>

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
        ) : (
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
                  <SelectInput
                    id='institutionDetails'
                    name='institutionDetails'
                    validator={{
                      required: 'Choose a institution',
                    }}
                    w='12rem'
                    options={institutionData.map((item) => ({
                      label: item?.institutionName,
                      value: item?._id,
                    }))}
                    optionProps={{
                      background: '#0996A1',
                      color: '#ffffff',
                    }}
                    onChange={(e) => setInstitutionDetails(e.target.value)}
                  >
                    Institution
                  </SelectInput>
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
        )}
      </Flex>
    </Flex>
  );
};

export default Report;
