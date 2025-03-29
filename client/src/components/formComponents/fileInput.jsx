import { Flex, Input, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

const FileUploadInput = ({
  label,
  id,
  isRequired,
  labelColor,
  onFileChange,
  ...rest
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileChange) {
        onFileChange(file);
      }
    }
  };

  return (
    <Flex direction='column' alignItems='flex-start' w='100%'>
      <Text color={labelColor} mb={2}>
        {label}
      </Text>
      <Flex w='100%' alignItems='center'>
        <Input
          type='file'
          id={id}
          hidden
          accept='image/*,application/pdf' // Adjust accepted file types as needed
          isRequired={isRequired}
          onChange={handleFileChange}
          {...rest}
        />
        <Button
          as='label'
          htmlFor={id}
          bg='brand.mainTeal'
          color='white'
          _hover={{ bg: 'green.400' }}
        >
          Choose File
        </Button>
        <Text ml={3} color='brand.white'>
          {fileName || 'No file chosen'}
        </Text>
      </Flex>
    </Flex>
  );
};

export default FileUploadInput;
