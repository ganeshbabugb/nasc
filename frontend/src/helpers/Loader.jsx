import { Flex } from "@chakra-ui/react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      background={"gray.50"}
    >
      <HashLoader color="#0BC5EA" loading={true} size={150} />
    </Flex>
  );
};

export default Loader;
