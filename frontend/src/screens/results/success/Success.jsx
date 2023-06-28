import React from "react";
import { useNavigate } from "react-router-dom";
import { useLottie } from "lottie-react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SuccessAnimation from "../../../assets/lotties/SuccessAnimation.json";

const Success = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  const options = {
    animationData: SuccessAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const BGC = useColorModeValue("gray.100", "gray.900");
  const TC = useColorModeValue("gray.900", "gray.300");

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={BGC}>
        <Box textAlign="center" py={10} px={6}>
          <Box maxWidth={300} mx="auto" marginBottom={"-6"}>
            {View}
          </Box>

          <Heading as="h2" size="xl" mt={6} mb={2} color={TC}>
            Hooray!
          </Heading>

          <Text color="gray.500" fontSize="lg" textAlign="center">
            You've Successfully Completed The Process.
          </Text>
          <Button
            onClick={goBack}
            mt={6}
            bgGradient="linear(to-r, blue.200, blue.300, blue.400)"
            color="white"
            variant="solid"
            colorScheme="blue"
          >
            Go Back
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Success;
