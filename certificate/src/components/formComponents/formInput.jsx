import { Flex, Input, Text } from '@chakra-ui/react';

const FormInput = ({ label, type, id, isRequired, labelColor, ...rest }) => {
  return (
    <Flex direction='column' alignItems='flex-start' w='100%' gap='2'>
      <Text color={labelColor}>{label}</Text>
      <Input
        border='2px solid'
        borderColor='brand.mainTeal'
        color='brand.white'
        borderRadius='1rem'
        type={type}
        id={id}
        isRequired={isRequired}
        bg='#FFFFFF94'
        {...rest}
      />
    </Flex>
  );
};

export default FormInput;
