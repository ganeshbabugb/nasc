import { Box, Flex, Heading } from "@chakra-ui/react";
import CustomBox from "../../components/CustomBox/CustomBox";
import AccountCreation from "../components/AccountCreation";

const StaffHomeScreen = () => {
  return (
    <Box minH="80vh">
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Heading as="h5" size="md">
            MY DASHBOARD
          </Heading>
        </Flex>
      </CustomBox>

      <AccountCreation />
    </Box>
  );
};

export default StaffHomeScreen;
