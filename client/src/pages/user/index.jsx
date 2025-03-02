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
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteUser from './deleteUser';
import UpdateUser from './updateUser';
import axiosInstance from '../../config/axiosInstance';
const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure(); // update modal

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`user/all`);
      if (response.data.status === 'success') {
        console.log(response.data.data);

        setLoading(false);
        setUserData(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
      },
      {
        Header: 'Institution Name',
        accessor: (row) => row?.institutionDetails?.institutionName || 'N/A',
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
                setSelectedUser(cell);
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
          USERS LIST
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
              {userData.length !== 0 ? (
                <TableComponent
                  columns={columns}
                  data={userData}
                  buttonName='Add User'
                  buttonLink='/user/users/create'
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
        <DeleteUser onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateUser onClose={onModalClose} Idata={selectedUser} />
      </MainModal>
    </Flex>
  );
};

export default UsersList;
