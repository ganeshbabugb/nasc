import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

export default function Configurator(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;
  const ml = useBreakpointValue({ base: "0", md: "160px", lg: "160px" });

  // const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.50");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const backgroundColor =
    colorMode === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(26, 32, 44, 0.7)";

  const backdropFilter =
    colorMode === "light"
      ? "saturate(180%) blur(5px)"
      : "saturate(180%) blur(5px)";

  const { userInfo } = useSelector((state) => state.auth);

  const lastLoginDate = userInfo?.lastLogin
    ? new Date(userInfo?.lastLogin).toLocaleDateString("en-GB")
    : "";
  const lastLoginTime = userInfo?.lastLogin
    ? new Date(userInfo?.lastLogin).toLocaleTimeString()
    : "";

  return (
    <Box zIndex="9999">
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement="bottom"
        blockScrollOnMount={false}
      >
        <DrawerContent
          backgroundColor={backgroundColor}
          backdropFilter={backdropFilter}
        >
          <DrawerBody
            w="full"
            ps="24px"
            pe="40px"
            ml={ml}
            py={4}
            // backgroundColor={bgColor}
            borderTop="1px"
            borderColor={borderColor}
          >
            <Flex flexDirection="column" alignItems="center">
              <Text
                fontSize="md"
                fontWeight="600"
                mb="4"
                color={textColor}
                textAlign="center"
              >
                {/* Welcome back, {`${userInfo.name} [ ${userInfo.id} ]!`} */}
                Welcome back,{" "}
                {`${
                  userInfo
                    ? userInfo?.name.charAt(0).toUpperCase() +
                      userInfo?.name.slice(1)
                    : ""
                } [ ${userInfo ? userInfo?.id.toUpperCase() : ""} ]!`}
              </Text>
              <Text fontSize="sm" mb="4" color={textColor} textAlign="Center">
                Your last login was recorded on {lastLoginDate} at{" "}
                {lastLoginTime}.
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="md" mr="4" color={textColor}>
                  Dark/Light
                </Text>
                <IconButton
                  size="md"
                  variant="outline"
                  aria-label="Toggle theme"
                  rounded="full"
                  icon={icon}
                  onClick={toggleColorMode}
                />
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
