import { Box } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
const { ToastContainer, toast } = createStandaloneToast();

const ChakraToast = (title, description, status, duration, position) => {
  return (
    <Box w={{ base: "full", md: 60 }}>
      <ToastContainer>
        {toast({
          title: title,
          description: description,
          status: status,
          duration: duration,
          isClosable: true,
          variant: "top-accent",
          position: position ? position : "bottom-right",
        })}
      </ToastContainer>
    </Box>
  );
};

export default ChakraToast;
