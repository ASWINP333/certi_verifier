import {
  Button,
  Flex,
  Heading,
  Spinner,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { MainModal, TableComponent } from '../../components';
import { useMemo, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import axiosInstance from '../../config/axiosInstance';
import CertificateDetails from './certificateDetails';
import UpdateCertificate from './updateCertificate';
import { MdVerified } from 'react-icons/md';
import DeleteCertificate from './deleteCertificate';
import { useCertificateList } from '../../store/certificateStore';
import { useQuery } from '@tanstack/react-query';
import { getMyCertificates } from '../../apis/certificateApis';
const CertificateList = () => {
  const { certificates, setCertificates } = useCertificateList();
  const [singleCertificateData, setSingleCertificateData] = useState({});
  const [loading, setLoading] = useState(true);
  const [singleLoading, setSingleLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      try {
        const response = await getMyCertificates();
        if (response.status === 200 && response.statusText === 'OK') {
          setCertificates(response?.data?.certificates);
          console.log(response?.data?.certificates);

          setLoading(false);
        }
        return response?.data?.certificates;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const handleBatchClick = async (certificate) => {
    try {
      setSingleLoading(true);
      const { data, status, statusText } = await axiosInstance.get(
        `certificate/get/${certificate?._id}`
      );

      if (status === 200 && statusText === 'OK') {
        setSingleCertificateData(data?.certificate);
        setSingleLoading(false);
        onDetailModalOpen();
      }
    } catch (error) {
      setSingleLoading(false);
      console.log(error?.message);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: (row) => (
          <Button
            variant='unstyled'
            style={{ cursor: 'pointer' }}
            _hover={{ textDecoration: 'underline', color: 'brand.dark' }}
            onClick={() => handleBatchClick(row)}
            p='0'
          >
            {row?.cId}
          </Button>
        ),
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
        Header: 'Status',
        accessor: 'status',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <Tooltip
            hasArrow
            label={value}
            bg='gray.300'
            color='black'
            placement='top'
          >
            <Flex
              alignItems='center'
              justify='center'
              fontSize='1.2rem'
              color={
                value === 'pending'
                  ? 'yellow.300'
                  : value === 'revoked'
                    ? 'red.500'
                    : 'green.500'
              }
            >
              <MdVerified />
            </Flex>
          </Tooltip>
        ),
      },
      {
        Header: 'Actions',
        accessor: (cell) => (
          <Flex alignItems='center' justify='center' p='0'>
            <Button
              variant='unstyled'
              bg='transparent'
              color='brand.white'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setSelectedUser(cell);
                onModalOpen();
              }}
              isDisabled={cell?.status === 'verified' ? true : false}
            >
              <MdEdit />
            </Button>
            <Button
              variant='unstyled'
              bg='transparent'
              color='brand.white'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setDeleteId(cell?._id);
                onOpen();
              }}
              isDisabled={cell?.status === 'verified' ? true : false}
            >
              <MdDelete />
            </Button>
          </Flex>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
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
          CERTIFICATES
        </Heading>
        <Flex w='100%' h='100%'>
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
            <TableComponent
              columns={columns}
              data={certificates}
              buttonName='Create Certificate'
              buttonLink='/user/certificates/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteCertificate onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateCertificate
          onClose={onModalClose}
          certificateData={selectedUser}
        />
      </MainModal>

      <MainModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        bgColor='brand.dashboardBg'
        size='xl'
      >
        <CertificateDetails
          onClose={onDetailModalClose}
          data={singleCertificateData}
          loading={singleLoading}
        />
      </MainModal>
    </Flex>
  );
};

export default CertificateList;
