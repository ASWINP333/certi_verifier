import {
  Button,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { MainModal, TableComponent } from '../../components';
import { MdDelete } from 'react-icons/md';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../config/axiosInstance';
import DeleteTemplate from './deleteTemplate';
const Templates = () => {
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState();
  const [templates, setTemplates] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal

  useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      try {
        const { data, status, statusText } =
          await axiosInstance.get(`template/getAll`);
        if (status === 200 && statusText === 'OK') {
          setTemplates(data);
          setLoading(false);
        }
        return data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: 'Template Id',
        accessor: 'templateId',
      },
      {
        Header: 'Template Name',
        accessor: 'templateName',
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
    <Flex w='100%' h='100vh'bg={'brand.bg'}>
      <Flex
        w='100%'
        h='100%'
        direction='column'
        alignItems='center'
        p='10'
        gap='12'
      >
        <Heading color='brand.mainTeal' textTransform='uppercase'>
          Templates
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
              data={templates}
              buttonName='Create Templates'
              buttonLink='/user/templates/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteTemplate onClose={onClose} id={deleteId} />
      </MainModal>
    </Flex>
  );
};

export default Templates;
