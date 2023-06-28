import { SmallAddIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select, chakraComponents } from "chakra-react-select";
import React, { useEffect, useId, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const { MenuList, ValueContainer, SingleValue, Placeholder } = chakraComponents;

const CustomMenuList = ({ selectProps, ...props }) => {
  const { onInputChange, inputValue, onMenuInputFocus } = selectProps;
  const id = useId();

  const ariaAttributes = {
    "aria-autocomplete": "list",
    "aria-label": selectProps["aria-label"],
    "aria-labelledby": selectProps["aria-labelledby"],
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.currentTarget.id === `addButton-${id}`) {
      e.preventDefault();
      if (inputValue.trim() !== "") {
        selectProps.onChange({
          value: inputValue,
          label: inputValue,
        });
      }
    }
  };

  return (
    <div>
      <InputGroup>
        <InputLeftElement>
          <FaSearch color="gray.200" size="14px" />
        </InputLeftElement>
        <Input
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 4rem 10px 2.5rem",
            border: "none",
            borderBottom: "1px solid lightgray",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          }}
          bg={useColorModeValue("white", "gray.700")}
          variant="unstyled"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          type="text"
          value={inputValue}
          onChange={(e) =>
            onInputChange(e.currentTarget.value, {
              action: "input-change",
            })
          }
          onKeyDown={handleKeyDown}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onFocus={onMenuInputFocus}
          size="sm"
          placeholder="Search or Add own value"
          {...ariaAttributes}
        />

        <InputRightElement width="4rem">
          <IconButton
            size="xs"
            variant="outline"
            borderRadius="full"
            id={`addButton-${id}`}
            onClick={handleKeyDown}
          >
            <SmallAddIcon />
          </IconButton>
        </InputRightElement>
      </InputGroup>
      <MenuList {...props} selectProps={selectProps} />
    </div>
  );
};

const CustomValueContainer = ({ children, selectProps, ...props }) => {
  const commonProps = {
    cx: props.cx,
    clearValue: props.clearValue,
    getStyles: props.getStyles,
    getValue: props.getValue,
    hasValue: props.hasValue,
    isMulti: props.isMulti,
    isRtl: props.isRtl,
    options: props.options,
    selectOption: props.selectOption,
    setValue: props.setValue,
    selectProps,
    theme: props.theme,
  };

  return (
    <ValueContainer {...props} selectProps={selectProps}>
      {React.Children.map(children, (child) => {
        return child ? (
          child
        ) : props.hasValue ? (
          <SingleValue
            {...commonProps}
            isFocused={selectProps.isFocused}
            isDisabled={selectProps.isDisabled}
          >
            {selectProps.getOptionLabel(props.getValue()[0])}
          </SingleValue>
        ) : (
          <Placeholder
            {...commonProps}
            key="placeholder"
            isDisabled={selectProps.isDisabled}
            data={props.getValue()}
          >
            {selectProps.placeholder}
          </Placeholder>
        );
      })}
    </ValueContainer>
  );
};

const CustomSelectWithInput = ({
  control,
  name,
  options,
  rules,
  label,
  shouldReset,
  resetField,
}) => {
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control, name, rules });

  const onDomClick = (e) => {
    let menu = containerRef.current.querySelector(".select__menu");

    if (
      !containerRef.current.contains(e.target) ||
      !menu ||
      !menu.contains(e.target)
    ) {
      setIsFocused(false);
      setInputValue("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && inputValue.trim() !== "") {
        const customOption = {
          value: inputValue,
          label: inputValue,
        };
        setSelectedOption(customOption);
        setInputValue("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", onDomClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", onDomClick);
    };
  }, [inputValue]);

  useEffect(() => {
    if (shouldReset) {
      resetField();
      setSelectedOption(null);
      setInputValue("");
    }
  }, [shouldReset, resetField]);

  return (
    <>
      <FormControl isInvalid={invalid}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <div ref={containerRef}>
          <Select
            {...field}
            className="basic-single"
            classNamePrefix="select"
            options={options}
            components={{
              MenuList: CustomMenuList,
              ValueContainer: CustomValueContainer,
            }}
            inputValue={inputValue}
            isSearchable={false}
            onMenuInputFocus={() => setIsFocused(true)}
            onChange={(selected) => {
              setSelectedOption(selected);
              field.onChange(selected?.value);
            }}
            onInputChange={(val) => setInputValue(val)}
            value={selectedOption}
            {...{
              menuIsOpen: isFocused || undefined,
              isFocused: isFocused || undefined,
            }}
            size="sm"
          />
        </div>
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    </>
  );
};

export default CustomSelectWithInput;
