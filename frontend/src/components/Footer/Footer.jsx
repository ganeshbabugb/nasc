import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Footer = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.200");
  return (
    <Box bg={bg} color={color}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={3}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text color="gray.500" textAlign="center">
          © {1900 + new Date().getYear()}{" "}
          <Link
            href="https://www.nandhaarts.org/"
            color={"gray.600"}
            isExternal
          >
            Nandha arts and Science College
          </Link>
          . All rights reserved. Explore, learn, and grow with us.
        </Text>

        <Text color="gray.500" textAlign="center">
          Developed By{" "}
          <Link
            href="https://www.ganesh-babu.online/"
            color={"gray.600"}
            isExternal
          >
            Ganeshbabu <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
      </Container>
    </Box>
  );
};
export default Footer;
