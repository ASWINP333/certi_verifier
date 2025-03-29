import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
  id,
  width,
  border,
  borderColor,
  placeholder,
  iconLeft: IconComponentLeft,
  iconColor,
  bgColor,
  isRequired,
  show = true,
  handleClick,
  ...rest
}) => {
  return (
    <InputGroup w={width} border={border} borderColor={borderColor} {...rest}>
      <InputLeftElement pointerEvents='none'>
        <IconComponentLeft color={iconColor} />
      </InputLeftElement>
      <InputRightElement>
        {show ? (
          <Button variant='unstyled' onClick={handleClick}>
            <FaEyeSlash />
          </Button>
        ) : (
          <Button variant='unstyled' onClick={handleClick}>
            <FaEye />
          </Button>
        )}
      </InputRightElement>
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        id={id}
        bg={bgColor}
        isRequired={isRequired}
        borderRadius='0.8rem'
      />
    </InputGroup>
  );
};

PasswordInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
  border: PropTypes.string,
  borderColor: PropTypes.string,
  iconLeft: PropTypes.elementType,
  iconColor: PropTypes.string,
  bgColor: PropTypes.string,
  isRequired: PropTypes.bool,
  show: PropTypes.any,
  handleClick: PropTypes.any,
};
export default PasswordInput;
