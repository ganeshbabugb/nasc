import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import bgCardAuth from "../assets/img/bgAuth.webp";
import bgAuth from "../assets/img/lineas-fondo-auth.png";
import ChakraToast from "../helpers/ChakraToast";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { userRoles } from "../utils/constants/roles";

const SuperAdminRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reg, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmit = async (data) => {
    console.log("data:", data);
    if (data.password !== data.confirmPassword) {
      ChakraToast("Error", "Passwords do not match", "error", 3000);
      console.log("Passwords do not match");
    } else {
      try {
        const { id, name, password } = data;
        const res = await reg({
          name,
          id,
          password,
          role: userRoles.superadmin,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        ChakraToast("Success", "Register Sucessfull!", "success", 3000);
      } catch (err) {
        ChakraToast("Error", err?.data?.message || err.error, "error", 3000);
      }
    }
  };

  const backgroundColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "gray.200");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack
          spacing={2}
          w="full"
          h={{ base: "100vh", lg: "100%" }}
          bgImage={bgAuth}
          px={{ base: 4, lg: 28 }}
          py={{ base: 14, lg: 20 }}
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            w="full"
            h={{ base: "auto", lg: "full" }}
            display={{ base: "none", lg: "flex" }}
          >
            <Box justifyContent="center" w="full" h="80vh">
              <Image
                objectFit="cover"
                w="full"
                h="80vh"
                src={bgCardAuth}
                rounded="lg"
              />
            </Box>
          </Flex>
          <Flex
            w="full"
            h={{ base: "auto", lg: "80vh" }}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              borderWidth={1}
              w="full"
              h="full"
              px={{ base: 8, lg: 10 }}
              mr={2}
              bg={backgroundColor}
              alignItems="center"
              justifyContent="center"
              borderRadius="lg"
              boxShadow="base"
              borderColor={borderColor}
              display="flex"
              flexDirection="column"
            >
              <Stack
                w="full"
                maxW="md"
                spacing={4}
                alignItems="center"
                justifyContent="center"
                py={8}
              >
                <Image
                  src="https://react-material.fusetheme.com/assets/images/logo/logo.svg"
                  w={16}
                />
                <Heading
                  textAlign={"center"}
                  fontSize="xl"
                  fontWeight="bold"
                  mt={2}
                  color={textColor}
                >
                  NASC-NANDHA ARTS AND SCIENCE COLLEGE
                </Heading>
                <Heading
                  textAlign={"center"}
                  fontSize="md"
                  fontWeight="bold"
                  mt={2}
                  color={textColor}
                >
                  SUPER ADMIN REGISTER PORTAL
                </Heading>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>User Name:</FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.400">
                      <BsFillPersonFill />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="User Name"
                      {...register("name", {
                        required: "Name is required.",
                      })}
                      size="md"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.id}>
                  <FormLabel>User ID:</FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.400">
                      <BsFillPersonFill />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="User ID"
                      {...register("id", {
                        required: "User ID is required.",
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.id && errors.id.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <FormLabel>Password:</FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.400">
                      <AiFillUnlock />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <InputRightElement width="2.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword((prev) => !prev)}
                        variant={"unstyled"}
                        color={"blue.500"}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel>Confirm Password:</FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.400">
                      <AiFillUnlock />
                    </InputLeftElement>
                    <Input
                      type={showCpassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm password is required.",
                      })}
                    />
                    <InputRightElement width="2.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowCpassword((prev) => !prev)}
                        variant={"unstyled"}
                        color={"blue.500"}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {showCpassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>

                <Button
                  w="full"
                  colorScheme={"messenger"}
                  _dark={{
                    bg: "messenger.500",
                    color: "white",
                    _hover: { bg: "messenger.700" },
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText="loading..."
                >
                  CONFIRM
                </Button>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                >
                  Already have an account? Click here to{" "}
                  <Link color="blue.500" as={ReachLink} to="/login">
                    login in
                  </Link>
                </Text>
              </Stack>
            </Box>
          </Flex>
        </HStack>
      </form>
    </>
  );
};

export default SuperAdminRegisterPage;
