import { ArrowBackIcon, DeleteIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import CustomBox from "../../components/CustomBox/CustomBox";
import CustomSelectWithInput from "../../components/CustomSelect/CustomSelectWithInput";
import IconCircle from "../../components/Icons/IconCircle";
import {
  GroupedStatesAndUnionTerritories,
  boardOfStudy,
  districts,
  instutionTypes,
  mediumOfStudy,
  twelfthGradeSubjects,
} from "../../utils/constants/variables";
import { Link } from "react-router-dom";

const AcademicDetails = () => {
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const firstFieldRef = useRef(null);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
    resetField,
  } = useForm({ mode: "onChange" });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({ control, name: "studentMarks" });

  const watchItems = watch("studentMarks");

  //add inital field and focous the first field instated of focusing the marks field
  if (itemFields.length === 0) {
    appendItem();
    setTimeout(() => {
      firstFieldRef.current.focus();
    }, 0);
  }

  const itemChange = (e, index) => {
    console.log("e:", e);
    console.log("index:", index);
    calculateTotalAndPercentage(watch("studentMarks"));
  };

  const itemPropChange = (index, propName, value) => {
    setValue(`Items.${index}.${propName}`, value);
    const updatedWatchItems = [...watch("studentMarks")];
    updatedWatchItems[index][propName] = value;
    calculateTotalAndPercentage(updatedWatchItems);
  };

  // Calculate total and percentage
  const calculateTotalAndPercentage = useCallback(() => {
    const totalMarks = watch("studentMarks").reduce(
      (acc, item) => acc + parseInt(item.Marks || 0),
      0
    );
    const calculatedPercentage =
      totalMarks === 0 ? 0 : (totalMarks / (watchItems.length * 100)) * 100;

    setTotal(totalMarks);
    setPercentage(calculatedPercentage.toFixed(2));
  }, [watch, watchItems]);

  useEffect(() => {
    calculateTotalAndPercentage();
  }, [calculateTotalAndPercentage]);

  const handleReset = () => {
    reset();
    setShouldReset(true);
    setTimeout(() => {
      setShouldReset(false);
    }, 100);
  };

  const onFormSubmit = (data) => console.log(data);

  return (
    <Box minH="80vh">
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Link to="">
            <ArrowBackIcon w={6} h={6} />
          </Link>
          <Heading as="h5" size="sm">
            ACADEMIC FORM
          </Heading>
          <Spacer />
          <IconCircle
            display="flex"
            bg="blue.300"
            color="white"
            onClick={handleReset}
            cursor="pointer"
          >
            <Tooltip label="Rest">
              <RepeatClockIcon />
            </Tooltip>
          </IconCircle>
        </Flex>
      </CustomBox>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CustomBox>
          <SimpleGrid p="10px" spacing={5} columns={[1, 2, 2]}>
            <FormControl isInvalid={errors.schoolName}>
              <FormLabel ref={firstFieldRef}> School Name: </FormLabel>
              <Input
                type="text"
                placeholder="School Name"
                {...register("schoolName", {
                  required: "School Name is Required.",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.schoolName && errors.schoolName.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.registerNumber}>
              <FormLabel>Register Number:</FormLabel>
              <Input
                type="number"
                placeholder="Enter your register number"
                {...register("registerNumber", {
                  required: "Register Number is required.",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.registerNumber && errors.registerNumber.message}
              </FormErrorMessage>
            </FormControl>

            <Controller
              control={control}
              name="instutionType"
              rules={{
                required: "Please Select Instution Type.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.instutionType}>
                  <FormLabel> Instution Type: </FormLabel>
                  <Select
                    //This key and value helps when you click reset button it does't clear the value in the field. To fix that key and value are add.
                    key={`key_${value}`}
                    value={value || ""}
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    options={instutionTypes}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select Instution Type"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.instutionType && errors.instutionType.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="boardOfStudy"
              rules={{
                required: "Please Select Board of Study.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.boardOfStudy}>
                  <FormLabel> Board of Study: </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    key={`key_${value}`}
                    value={value || ""}
                    onBlur={onBlur}
                    options={boardOfStudy}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select Board of Study"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.boardOfStudy && errors.boardOfStudy.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <CustomSelectWithInput
              name="mediumOfStudy"
              control={control}
              options={mediumOfStudy}
              label="Medium of Study:"
              rules={{ required: "Select medium of study" }}
              resetField={resetField}
              shouldReset={shouldReset}
            />

            <FormControl isInvalid={errors.completionYear}>
              <FormLabel> Completion Year: </FormLabel>
              <Input
                type="date"
                placeholder="Completion Year"
                {...register("completionYear", {
                  required: "Completion Year is Required.",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.completionYear && errors.completionYear.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.groupName}>
              <FormLabel>Group Name:</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Group Name"
                {...register("groupName", {
                  required: "Group Name is required",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.groupName && errors.groupName.message}
              </FormErrorMessage>
            </FormControl>

            <Controller
              control={control}
              name="state"
              rules={{
                required: "Please Select State.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.state}>
                  <FormLabel> State: </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    key={`key_${value}`}
                    value={value || ""}
                    onBlur={onBlur}
                    options={GroupedStatesAndUnionTerritories}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select your state"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.state && errors.state.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="district"
              rules={{
                required: "Please district Name.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.district}>
                  <FormLabel> District Name: </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    key={`key_${value}`}
                    value={value || ""}
                    options={districts}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select District Name"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.district && errors.district.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />
          </SimpleGrid>
        </CustomBox>

        <CustomBox>
          <TableContainer overflowX="auto" w="100%">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th textAlign="center">No</Th>
                  <Th textAlign="center">Subjects</Th>
                  <Th textAlign="center">Marks</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody textAlign="center">
                {itemFields &&
                  itemFields.map((item, index) => {
                    return (
                      <Tr key={item.id}>
                        <Td textAlign="center">{index + 1} </Td>
                        <Td textAlign="center">
                          <Controller
                            control={control}
                            name={`studentMarks.${index}.subjectName`}
                            rules={{
                              required: "Please Select Subject Name.",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <FormControl
                                isInvalid={
                                  errors.studentMarks?.[index]?.subjectName
                                }
                              >
                                <Select
                                  key={`key_${value}`}
                                  value={value || ""}
                                  chakraStyles={{
                                    container: (base) => ({
                                      ...base,
                                      minW: "250px",
                                    }),
                                    menuPortal: (provided) => ({
                                      ...provided,
                                      zIndex: 9000,
                                    }),
                                    menu: (provided) => ({
                                      ...provided,
                                      zIndex: 9000,
                                    }),
                                  }}
                                  menuPosition="fixed"
                                  name={name}
                                  ref={ref}
                                  onChange={(e) => {
                                    onChange(e);
                                    itemChange(e, index);
                                  }}
                                  onBlur={onBlur}
                                  options={twelfthGradeSubjects}
                                  placeholder="Select Subject Name"
                                  closeMenuOnSelect={true}
                                  getOptionLabel={(e) => e.label}
                                  getOptionValue={(e) => e.value}
                                  size="sm"
                                />
                                <FormErrorMessage>
                                  {
                                    errors.studentMarks?.[index]?.subjectName
                                      ?.message
                                  }
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          />
                        </Td>

                        <Td minW="120px" textAlign="center">
                          <FormControl
                            isInvalid={errors.studentMarks?.[index]?.Marks}
                          >
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              placeholder="Marks"
                              {...register(`studentMarks.${index}.Marks`, {
                                required: "Mark is Required.",
                                min: {
                                  value: 0,
                                  message: `Minimum value should be 0.`,
                                },
                                max: {
                                  value: 100,
                                  message: `Maximum value should be 100.`,
                                },
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "Marks",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                            />
                            <FormErrorMessage>
                              {errors.studentMarks?.[index]?.Marks?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>
                        <Td textAlign="center">
                          <IconButton
                            borderRadius="full"
                            colorScheme="red"
                            onClick={() => removeItem(index)}
                            isDisabled={itemFields.length <= 1}
                            size="sm"
                          >
                            <DeleteIcon w={3} h={3} />
                          </IconButton>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </CustomBox>
        <CustomBox>
          <Stack>
            <Button colorScheme="teal" onClick={() => appendItem()}>
              Add Subject
            </Button>
          </Stack>
        </CustomBox>
        <CustomBox>
          <SimpleGrid
            p="10px"
            spacing={5}
            columns={[1, 2, 2]}
            alignItems="center"
          >
            <Text>Total: {total}</Text>
            <Text>Percentage: {percentage}%</Text>
          </SimpleGrid>
          <Button width="full" colorScheme="blue" type="submit">
            SUBMIT
          </Button>
        </CustomBox>
      </form>
    </Box>
  );
};

export default AcademicDetails;
