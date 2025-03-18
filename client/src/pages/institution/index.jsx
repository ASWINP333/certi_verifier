import {
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MainModal, TableComponent } from '../../components';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteInstituion from './deleteInstituion';
import UpdateInstitution from './updateInstitution';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllInstitutions } from '../../apis/institutionApis';
import { useInstitutionList } from '../../store/institutionStore';
const InstitutionList = () => {
  const { institutions, setInstitutions } = useInstitutionList();
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [selectedInstitution, setSelectedInstitution] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure(); // update modal

  useQuery({
    queryKey: ['institutions'],
    queryFn: async () => {
      try {
        const response = await getAllInstitutions();
        if (response.status === 200 && response.statusText === 'OK') {
          setInstitutions(response?.data?.institutions);
          setLoading(false);
        }
        return response?.data?.institutions;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

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
              {institutions.length !== 0 ? (
                <TableComponent
                  columns={columns}
                  data={institutions}
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
