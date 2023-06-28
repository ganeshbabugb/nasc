import { Box } from "@chakra-ui/react";

export default function IconCircle(props) {
  const { children, ...rest } = props;

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      h="40px"
      w="40px"
      me={2}
      cursor="pointer"
      {...rest}
    >
      {children}
    </Box>
  );
}
