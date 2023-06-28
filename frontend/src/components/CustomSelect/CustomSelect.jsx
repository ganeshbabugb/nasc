import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useController } from "react-hook-form";

const CustomSelect = ({
  name,
  label,
  options,
  isMulti,
  control,
  rules,
  ...rest
}) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl isInvalid={invalid} {...rest}>
      <FormLabel htmlFor={name}>{label + ":"}</FormLabel>
      <Select
        {...field}
        key={`key_${field.value}`}
        value={field.value || ""}
        options={options}
        isMulti={isMulti}
        placeholder={`Select ${label.toLowerCase()}`}
        closeMenuOnSelect={true}
        size="sm"
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomSelect;
