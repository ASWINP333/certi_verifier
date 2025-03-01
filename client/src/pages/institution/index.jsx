import {
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MainModal, TableComponent } from '../../components';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteInstituion from './deleteInstituion';
import UpdateInstitution from './updateInstitution';
const InstitutionList = () => {
  const [institutionData, setInstitutionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [selectedInstitution, setSelectedInstitution] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure(); // update modal

  useEffect(() => {
    getInstitutionData();
  }, []);

  const getInstitutionData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/institution/getAll`
      );
      if (response.data.status === 'success') {
        setLoading(false);
        setInstitutionData(response.data.institutions);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'iId',
      },
      {
        Header: 'Name',
        accessor: 'institutionName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Actions',
        accessor: (cell) => (
          <Flex>
            <Button
              bg='transparent'
              color='brand.white'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setSelectedInstitution(cell);
                onModalOpen();
              }}
            >
              <MdEdit />
            </Button>
            <Button
              bg='transparent'
              color='brand.white'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setDeleteId(cell?.iId);
                onOpen();
              }}
            >
              <MdDelete />
            </Button>
          </Flex>
        ),
      },
    ],
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
          INSTITUTIONS
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
            <>
              {institutionData.length !== 0 ? (
                <TableComponent
                  columns={columns}
                  data={institutionData}
                  buttonName='Add Institution'
                  buttonLink='/user/institutions/create'
                  isButton={true}
                  isPagination={true}
                />
              ) : (
                <Text>No Data available</Text>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteInstituion onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateInstitution onClose={onModalClose} Idata={selectedInstitution} />
      </MainModal>
    </Flex>
  );
};

export default InstitutionList;
