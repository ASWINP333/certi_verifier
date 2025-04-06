import { FormControl, FormLabel } from '@chakra-ui/react';
import Select from 'react-select';
import { Flex, Image, Text } from '@chakra-ui/react';

const SelectInputWithImage = ({
  children,
  options,
  isRequired = false,
  labelProps,
  onChange,
  value,
  ...rest
}) => {
  // Find the selected option object from value string
  const selectedOption = options.find((option) => option.value === value);

  return (
    <FormControl isRequired={isRequired} w='45%'>
      <FormLabel color='brand.white' {...labelProps}>
        {children}
      </FormLabel>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) =>
          onChange({ target: { value: selected?.value } })
        }
        getOptionLabel={(e) => (
          <Flex align='center' gap='2'>
            <Image
              src={e.image}
              alt={e.label}
              boxSize='20px'
              borderRadius='full'
            />
            <Text color='white'>{e.label}</Text>
          </Flex>
        )}
        getOptionValue={(e) => e.value}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: '#0996A1',
            border: 'none',
            color: '#ffffff',
          }),
          singleValue: (base) => ({
            ...base,
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#0996A1',
            color: '#ffffff',
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#0bb2bd' : '#0996A1',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }),
        }}
        {...rest}
      />
    </FormControl>
  );
};

export default SelectInputWithImage;
