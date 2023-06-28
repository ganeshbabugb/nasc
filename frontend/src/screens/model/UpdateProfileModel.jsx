import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible, AiFillUnlock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ChakraToast from "../../helpers/ChakraToast";
import { setCredentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: userInfo ? userInfo?.id : "",
      name: userInfo ? userInfo?.name : "",
      password: "",
    },
  });

  const onFormSubmit = async (data) => {
    const { name, id, password } = data;
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        id,
        password,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      ChakraToast("Success", "Profile updated successfully!", "success", 3000);
      console.log("Profile updated successully");
    } catch (err) {
      ChakraToast("ERROR", err?.data?.message || err.error, "error", 3000);
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ sm: "sm", md: "md", xl: "xl" }}
    >
      <ModalOverlay
        marginTop={"20"}
        marginLeft={{ sm: "0", md: "60", lg: "60" }}
      />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <ModalContent
          marginTop={"28"}
          marginLeft={{ sm: "0", md: "60", lg: "60" }}
        >
          <ModalHeader>Update Profile</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={errors.name} mt={4}>
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

            <FormControl isInvalid={errors.id} mt={4}>
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

            <FormControl isInvalid={errors.password} mt={4}>
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
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isLoading}
              loadingText="Updating..."
              type="submit"
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateProfileModal;
