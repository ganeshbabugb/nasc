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
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomBox from "../../components/CustomBox/CustomBox";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import IconCircle from "../../components/Icons/IconCircle";
import { gender, maritalStatusOption } from "../../utils/constants/variables";

const StaffDetails = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (data) => {
    console.log("data:", data);
  };

  return (
    <>
      <Box minH="80vh">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <CustomBox>
            <Flex alignItems="center" gap={2}>
              <Link to="/">
                <ArrowBackIcon w={6} h={6} />
              </Link>
              <Heading as="h5" size="sm">
                STAFF INFORMATION
              </Heading>
              <Spacer />
              <IconCircle
                display="flex"
                bg="blue.300"
                color="white"
                onClick={() => reset()}
                cursor="pointer"
              >
                <Tooltip label="Reset">
                  <RepeatClockIcon />
                </Tooltip>
              </IconCircle>
            </Flex>
          </CustomBox>

          <CustomBox>
            <SimpleGrid p="10px" spacing={5} columns={[1, 2, 2]}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", { required: "Name is required" })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <CustomSelect
                name="gender"
                label="Gender"
                options={gender}
                control={control}
                rules={{ required: "Please select your gender" }}
              />

              <FormControl isInvalid={errors.designation}>
                <FormLabel>Designation:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your designation"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.designation && errors.designation.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.department}>
                <FormLabel>Department:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your department"
                  {...register("department", {
                    required: "Department is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.department && errors.department.message}
                </FormErrorMessage>
              </FormControl>

              <CustomSelect
                name="maritalStatus"
                label="Martial Status"
                options={maritalStatusOption}
                control={control}
                rules={{ required: "Please select your marital status" }}
              />

              <FormControl isInvalid={errors.spouseName}>
                <FormLabel>Sporse Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your sporse name"
                  {...register("spouseName", {
                    required: "Sporse name is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.spouseName && errors.spouseName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.spouseDesignation}>
                <FormLabel>Spouse Designation:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your sporse designation"
                  {...register("spouseDesignation", {
                    required: "spouse designation is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.spouseDesignation && errors.spouseDesignation.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email Address:</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email address is required",
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

              <FormControl isInvalid={errors.altMobileNumber}>
                <FormLabel>Alternative Mobile Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your alternative mobile number"
                  {...register("altMobileNumber", {
                    required: "Alternative mobile Number is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.altMobileNumber && errors.altMobileNumber.message}
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

              <FormControl isInvalid={errors.yearOfExperience}>
                <FormLabel>Years of Experience:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your years of experience"
                  {...register("yearOfExperience", {
                    required: "Year of Experience is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.yearOfExperience && errors.yearOfExperience.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.yearOfEnrollment}>
                <FormLabel>Year of Enrollment:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter year of enrollment"
                  {...register("yearOfEnrollment", {
                    required: "Year of Joining is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.yearOfEnrollment && errors.yearOfEnrollment.message}
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

              <FormControl isInvalid={errors.caste}>
                <FormLabel>Caste:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your caste"
                  {...register("caste", {
                    required: "Caste is required",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.caste && errors.caste.message}
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

export default StaffDetails;
