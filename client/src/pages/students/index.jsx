import {
  Button,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { MainModal, TableComponent } from '../../components';
import { useMemo, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import DeleteUser from './deleteUser';
import { useQuery } from '@tanstack/react-query';
import { useUserList } from '../../store/userStore';
import { getMyStudents } from '../../apis/studentApis';
const StudentList = () => {
  const { users, setUsers } = useUserList();
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal

  useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      try {
        const response = await getMyStudents();
        if (response.status === 200 && response.statusText === 'OK') {
          setUsers(response?.data?.data);
          console.log(response?.data?.data);

          setLoading(false);
        }
        return response?.data?.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

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
        Header: 'Course',
        accessor: 'courseDetails',
      },
      {
        Header: 'Enrollment Number',
        accessor: 'enrollmentNumber',
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
                setDeleteId(cell?._id);
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
          STUDENTS LIST
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
              data={users}
              buttonName='Add Student'
              buttonLink='/user/students/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteUser onClose={onClose} id={deleteId} />
      </MainModal>
    </Flex>
  );
};

export default StudentList;
