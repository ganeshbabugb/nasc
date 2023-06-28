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
import AlertAnimation from "../../../assets/lotties/AlertAnimation.json";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");
  const options = {
    animationData: AlertAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const BGC = useColorModeValue("gray.100", "gray.900");
  const TC = useColorModeValue("gray.900", "gray.300");

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={BGC}>
        <Box textAlign="center" px={6}>
          <Box maxWidth={180} mx="auto" marginBottom={"-6"}>
            {View}
          </Box>

          <Heading as="h2" size="xl" mb={2} color={TC}>
            Access Denied
          </Heading>

          <Text color="gray.500" fontSize="lg" textAlign="center">
            You Don’t Have Permission To Access This Page.
          </Text>
          <Button
            onClick={goBack}
            mt={6}
            bgGradient="linear(to-r, yellow.300, yellow.400, yellow.500)"
            color="white"
            variant="solid"
            colorScheme="yellow"
          >
            Go Back
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Unauthorized;
