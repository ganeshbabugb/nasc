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
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomBox from "../../components/CustomBox/CustomBox";
import IconCircle from "../../components/Icons/IconCircle";
import { API_BASE_URL } from "../../utils/constants/config";

const BankDetailsForm = ({ preloadedValues }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: preloadedValues, mode: "onChange" });

  const handleReset = () => {
    reset();
  };

  const { userInfo } = useSelector((state) => state.auth);

  const onFormSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/bank-details`,
        { _id: userInfo?._id, ...data },
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
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <CustomBox>
            <Flex alignItems="center" gap={2}>
              <Link to="/">
                <ArrowBackIcon w={6} h={6} />
              </Link>
              <Heading as="h5" size="sm">
                BANK DETAILS FORM
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
              <FormControl isInvalid={errors.name}>
                <FormLabel>Account Holder's Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name as per bank book"
                  {...register("name", {
                    required:
                      "Please provide the name associated with the bank account.",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.bankName}>
                <FormLabel>Bank Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your bank name"
                  {...register("bankName", {
                    required: "Bank Name is required.",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.bankName && errors.bankName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.branchName}>
                <FormLabel>Branch Name:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your branch name"
                  {...register("branchName", {
                    required: "Branch Name is required.",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.branchName && errors.branchName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.accountNumber}>
                <FormLabel>Account Number:</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter your account number"
                  {...register("accountNumber", {
                    required: "Account number is required.",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.accountNumber && errors.accountNumber.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.ifscCode}>
                <FormLabel>IFSC Code:</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your IFIC code"
                  {...register("ifscCode", {
                    required: "IFSC Code is required.",
                  })}
                  size="sm"
                />
                <FormErrorMessage>
                  {errors.ifscCode && errors.ifscCode.message}
                </FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </CustomBox>
          <CustomBox>
            <Stack>
              <Button type="submit" colorScheme="blue">
                {preloadedValues === null ? "SUBMIT" : "UPDATE"}
              </Button>
            </Stack>
          </CustomBox>
        </form>
      </Box>
    </>
  );
};

export default BankDetailsForm;
