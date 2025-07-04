import { FormControl, FormLabel, Select } from '@chakra-ui/react';

const SelectInput = ({
  children,
  options,
  isRequired = false,
  labelProps,
  optionProps,
  ...rest
}) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel htmlFor='input label' color='brand.white' {...labelProps}>
        {children}
      </FormLabel>
      <Select
        as='select'
        color='brand.white'
        {...rest}
        border='none'
        borderBottom='2px solid'
        borderBottomColor='brand.mainTeal'
        borderRadius='0'
      >
        <option value='' style={optionProps}>
          Choose...
        </option>
        {options.map((optn, index) => (
          <option
            key={index}
            value={optn.value}
            label={optn.label || optn.value}
            style={optionProps}
          />
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
