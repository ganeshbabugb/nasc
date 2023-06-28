import { ArrowBackIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spacer,
  Stack,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomBox from "../../components/CustomBox/CustomBox";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomSelectWithInput from "../../components/CustomSelect/CustomSelectWithInput";
import IconCircle from "../../components/Icons/IconCircle";
import { API_BASE_URL } from "../../utils/constants/config";
import {
  GroupedStatesAndUnionTerritories,
  defaultOptions,
  deptartments,
  districts,
  gender,
} from "../../utils/constants/variables";

const StudentDetails = () => {
  const [shouldReset, setShouldReset] = React.useState(false);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    resetField,
  } = useForm({
    mode: "onChange",
  });

  const handleReset = () => {
    reset();
    setShouldReset(true);
    setTimeout(() => {
      setShouldReset(false);
    }, 100);
  };

  const { userInfo } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const { gender, isPhysicalChallenged, languagesKnown, caste, ...rest } =
      data;
    const languageKnownValues = languagesKnown.map(
      (language) => language.value
    );

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/studentDetail`,
        {
          _id: userInfo?._id,
          gender: gender.value,
          isPhysicalChallenged: isPhysicalChallenged.value,
          languagesKnown: languageKnownValues,
          caste: caste.value,
          ...rest,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Form data sent successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <>
      <Box minH="80vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomBox>
            <Flex alignItems="center" gap={2}>
              <Link to="">
                <ArrowBackIcon w={6} h={6} />
              </Link>
              <Heading as="h5" size="sm">
                STUDENT INFORMATION
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

          <CustomBox>
            <SimpleGrid p="10px" spacing={5} columns={[1, 2, 2]}>
              <FormControl isInvalid={errors.userName}>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("userName", { required: "Name is required" })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.userName && errors.userName.message}
                </FormErrorMessage>
              </FormControl>
              <CustomSelect
                name="gender"
                label="Gender"
                options={gender}
                control={control}
                rules={{ required: "Please select a Gender" }}
              />

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email Address:</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.mobileNumber}>
                <FormLabel>Mobile Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your mobile number"
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.mobileNumber && errors.mobileNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.dob}>
                <FormLabel>Date of Birth:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your date of birth"
                  {...register("dob", { required: "DOB is required" })}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.dob && errors.dob.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.fatherName}>
                <FormLabel>Father's Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your father's name"
                  {...register("fatherName", {
                    required: "Father's Name is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.fatherName && errors.fatherName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.fatherOccupation}>
                <FormLabel>Father's Occupation:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your father's occupation"
                  {...register("fatherOccupation", {
                    required: "Father's Occupation is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.fatherOccupation && errors.fatherOccupation.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.motherName}>
                <FormLabel>Mother's Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your mother's name"
                  {...register("motherName", {
                    required: "Mother's Name is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.motherName && errors.motherName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.motherOccupation}>
                <FormLabel>Mother's Occupation:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your mother's occupation"
                  {...register("motherOccupation", {
                    required: "Mother's Occupation is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.motherOccupation && errors.motherOccupation.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.motherTongue}>
                <FormLabel>Mother Tongue:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your mother tongue"
                  {...register("motherTongue", {
                    required: "Mother Tongue is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.motherTongue && errors.motherTongue.message}
                </FormErrorMessage>
              </FormControl>

              <CustomSelect
                isMulti={true}
                name="languagesKnown"
                label="Languages Known"
                options={deptartments}
                control={control}
                rules={{ required: "Languages known is required" }}
              />

              <FormControl isInvalid={errors.emisNumber}>
                <FormLabel>EMIS Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your EMIS Number"
                  {...register("emisNumber", {
                    required: "EMIS Number is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.emisNumber && errors.emisNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.aadharNumber}>
                <FormLabel>Aadhar Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your aadhar number"
                  {...register("aadharNumber", {
                    required: "Aadhar Number is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.aadharNumber && errors.aadharNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.panNumber}>
                <FormLabel>PAN Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your PAN number"
                  {...register("panNumber", {
                    required: "PAN Number is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.panNumber && errors.panNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.religion}>
                <FormLabel>Religion:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your religion"
                  {...register("religion", {
                    required: "Religion is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.religion && errors.religion.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.community}>
                <FormLabel>Community:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your community"
                  {...register("community", {
                    required: "Community is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.community && errors.community.message}
                </FormErrorMessage>
              </FormControl>

              <CustomSelectWithInput
                name="caste"
                control={control}
                options={defaultOptions}
                label="Caste:"
                rules={{ required: "Please select your caste" }}
                resetField={resetField}
                shouldReset={shouldReset}
              />

              <FormControl isInvalid={errors.communityCertificationNumber}>
                <FormLabel>Community Certification Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your Community Certification Number"
                  {...register("communityCertificationNumber", {
                    required: "Community Certification Number is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.communityCertificationNumber &&
                    errors.communityCertificationNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.bloodGroup}>
                <FormLabel>Blood Group:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your blood group"
                  {...register("bloodGroup", {
                    required: "Blood Group is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.bloodGroup && errors.bloodGroup.message}
                </FormErrorMessage>
              </FormControl>

              <CustomSelect
                name="isPhysicalChallenged"
                label="Physical Challenges"
                options={[
                  {
                    label: "YES",
                    value: true,
                  },
                  {
                    label: "NO",
                    value: false,
                  },
                ]}
                control={control}
                rules={{ required: "Physical challenges are required" }}
              />

              <FormControl isInvalid={errors.nationality}>
                <FormLabel>Nationality:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your nationality"
                  {...register("nationality", {
                    required: "Nationality is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.nationality && errors.nationality.message}
                </FormErrorMessage>
              </FormControl>

              <CustomSelectWithInput
                name="state"
                control={control}
                options={GroupedStatesAndUnionTerritories}
                label="State:"
                rules={{ required: "Select your state" }}
                resetField={resetField}
                shouldReset={shouldReset}
              />

              <CustomSelectWithInput
                name="district"
                control={control}
                options={districts}
                label="District:"
                rules={{ required: "Select your district" }}
                resetField={resetField}
                shouldReset={shouldReset}
              />

              <FormControl isInvalid={errors.place}>
                <FormLabel>Place:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your place"
                  {...register("place", {
                    required: "place is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.place && errors.place.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.permanentAddress}>
                <FormLabel>Permanent Address:</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Enter your permanent address"
                  {...register("permanentAddress", {
                    required: "Permanent Address is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.permanentAddress && errors.permanentAddress.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.communicationAddress}>
                <FormLabel>Communication Address:</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Enter your communication address"
                  {...register("communicationAddress", {
                    required: "Communication Address is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.communicationAddress &&
                    errors.communicationAddress.message}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </CustomBox>
          <CustomBox>
            <Stack>
              <Button colorScheme="blue" type="submit">
                SUBMIT
              </Button>
            </Stack>
          </CustomBox>
        </form>
      </Box>
    </>
  );
};

export default StudentDetails;
