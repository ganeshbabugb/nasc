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
import PageNotFoundAnimation from "../../../assets/lotties/PageNotFoundAnimation.json";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate("/");

  const options = {
    animationData: PageNotFoundAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const BGC = useColorModeValue("gray.100", "gray.900");
  const TC = useColorModeValue("gray.900", "gray.300");

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={BGC}>
        <Box textAlign="center" px={6}>
          <Box maxWidth={200} mx="auto">
            {View}
          </Box>

          <Heading as="h2" size="xl" mb={2} color={TC}>
            Page Not Found
          </Heading>

          <Text color="gray.500" fontSize="lg" textAlign="center">
            The page you're looking for doesn't seem to exist.
          </Text>

          <Button
            mt={6}
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
            onClick={goBack}
          >
            Go Back
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default NotFoundPage;
