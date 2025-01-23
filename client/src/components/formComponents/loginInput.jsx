import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const LoginInput = ({
  type,
  id,
  width,
  border,
  borderColor,
  placeholder,
  icon: IconComponent,
  iconColor,
  bgColor,
  isRequired,
  ...rest
}) => {
  return (
    <InputGroup w={width} border={border} borderColor={borderColor} {...rest}>
      <InputLeftElement pointerEvents='none'>
        <IconComponent color={iconColor} />
      </InputLeftElement>
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        bg={bgColor}
        isRequired={isRequired}
        borderRadius='0.8rem'
      />
    </InputGroup>
  );
};

LoginInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  bgColor: PropTypes.string,
  isRequired: PropTypes.bool,
};
export default LoginInput;