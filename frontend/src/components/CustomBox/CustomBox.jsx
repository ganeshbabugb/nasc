import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function CustomBox(props) {
  const backgroundColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "gray.200");

  return (
    <Box
      mb={5}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      p={3}
      bg={backgroundColor}
      color={textColor}
      {...props}
    >
      {props.children}
    </Box>
  );
}
