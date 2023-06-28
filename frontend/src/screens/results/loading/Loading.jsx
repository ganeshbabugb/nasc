import React from "react";
import { useLottie } from "lottie-react";
import { Box, Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import LoadingAnimation from "../../../assets/lotties/LoadingAnimation.json";

const Loading = () => {
  const options = {
    animationData: LoadingAnimation,
    loop: true,
  };
  const { View } = useLottie(options);

  const BGC = useColorModeValue("gray.100", "gray.900");
  const TC = useColorModeValue("gray.900", "gray.300");

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={BGC}>
        <Box textAlign="center" px={6}>
          <Box maxWidth={350} mx="auto">
            {View}
          </Box>

          <Heading as="h2" size="xl" mb={2} color={TC}>
            Patience is a virtue!
          </Heading>

          <Text color="gray.500" fontSize="lg" textAlign="center">
            We're almost there, just a few more seconds.
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Loading;
