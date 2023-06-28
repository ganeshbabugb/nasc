import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiHome, FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import FixedPlugin from "../FixedPlugin/FixedPlugin";
import { Separator } from "../Separator/Separator";
import { userRoles } from "../../utils/constants/roles";
import UpdateProfileModal from "../../screens/model/UpdateProfileModel";

const LINKS = {
  student: [
    { name: "Dashboard", icon: <FiHome />, to: "/" },
    { name: "Student Detail", icon: <FiHome />, to: "/student-detail" },
    { name: "Bank Details", icon: <FiHome />, to: "/bank-detail" },
  ],
  staff: [
    { name: "Dashboard", icon: <FiHome />, to: "/" },
    { name: "Staff Details", icon: <FiHome />, to: "/staff-detail" },
    { name: "Bank Details", icon: <FiHome />, to: "/bank-detail" },
    { name: "Student Table", icon: <FiHome />, to: "/student-detail-table" },
    { name: "Bank Table", icon: <FiHome />, to: "/bank-details-table" },
  ],
  admin: [
    { name: "Dashboard", icon: <FiHome />, to: "/" },
    { name: "Bank Details", icon: <FiHome />, to: "/bank-detail" },
    { name: "Bank Table", icon: <FiHome />, to: "/bank-details-table" },
    { name: "Student Table", icon: <FiHome />, to: "/student-detail-table" },
  ],
  superadmin: [
    { name: "Dashboard", icon: <FiHome />, to: "/" },
    { name: "Bank Table", icon: <FiHome />, to: "/bank-details-table" },
    { name: "Student Table", icon: <FiHome />, to: "/student-detail-table" },
  ],
};

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Flex flexDirection="column" minHeight="100vh">
          {children}
          <Spacer />
          <FixedPlugin />
          <Footer />
        </Flex>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { colorMode } = useColorMode();
  const backgroundColor =
    colorMode === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(26, 32, 44, 0.7)";

  const backdropFilter =
    colorMode === "light"
      ? "saturate(180%) blur(5px)"
      : "saturate(180%) blur(5px)";

  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.matchMedia("(orientation: landscape)").matches) {
        onClose();
      }
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, [onClose]);

  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo
    ? Object.keys(userRoles).find((key) => userRoles[key] === userInfo.role)
    : null;

  return (
    <Box
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      borderRightWidth="1px"
      bg={backgroundColor}
      backdropFilter={backdropFilter}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      top={0}
      bottom={0}
      left={0}
      zIndex="9999"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          display={{ base: "none", sm: "flex" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          NASC
        </Text>
      </Flex>
      <Separator />
      <Box
        pt="12px"
        overflowY="auto"
        height="calc(100% - 80px)"
        px="4"
        pb="4"
        boxShadow="lg"
      >
        {role &&
          LINKS[role].map((link) => (
            <NavItem
              key={link.name}
              icon={link.icon}
              to={link.to}
              onClose={onClose}
            >
              {link.name}
            </NavItem>
          ))}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, to, onClose }) => {
  const activeBg = useColorModeValue("white", "gray.700");
  const inactiveBg = useColorModeValue("white", "gray.700");
  const activeColor = useColorModeValue("gray.700", "white");
  const inactiveColor = useColorModeValue("gray.400", "gray.400");

  return (
    <Link
      as={NavLink}
      to={to}
      _focus={{ outline: "none" }}
      style={{ textDecoration: "none" }}
    >
      {({ isActive }) => (
        <Button
          boxSize="initial"
          justifyContent="flex-start"
          alignItems="center"
          bg={isActive ? activeBg : "transparent"}
          mb={{ xl: "12px" }}
          mx={{ xl: "auto" }}
          ps={{ sm: "10px", xl: "16px" }}
          py="12px"
          borderRadius="15px"
          _hover={{}}
          w="100%"
          _active={{
            bg: "inherit",
            transform: "none",
            borderColor: "transparent",
          }}
          _focus={{
            boxShadow: "none",
          }}
          px={2}
          onClick={onClose}
        >
          {icon && (
            <Flex alignItems="center">
              {typeof icon === "string" ? (
                <Icon
                  as={icon}
                  color={isActive ? activeColor : inactiveColor}
                  me={2}
                />
              ) : (
                <Box
                  bg={isActive ? "blue.300" : inactiveBg}
                  color={isActive ? "white" : "blue.300"}
                  h="40px"
                  w="40px"
                  me={2}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {icon}
                </Box>
              )}
              <Text
                color={isActive ? activeColor : inactiveColor}
                fontSize="md"
                fontWeight={isActive ? "bold" : "normal"}
              >
                {children}
              </Text>
            </Flex>
          )}
        </Button>
      )}
    </Link>
  );
};

const MobileNav = ({ onOpen, isOpen, onClose }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isUpdateProfieModelOpen, setIsUpdateProfieModelOpen] = useState(false);

  const backgroundColor =
    colorMode === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(26, 32, 44, 0.7)";

  const backdropFilter =
    colorMode === "light"
      ? "saturate(180%) blur(5px)"
      : "saturate(180%) blur(5px)";

  const handleOpenModal = () => {
    setIsUpdateProfieModelOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateProfieModelOpen(false);
  };

  const icon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Flex
        position="fixed"
        top="0"
        left="0"
        right="0"
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        justifyContent={{ base: "space-between", md: "flex-end" }}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        boxShadow="md"
        bg={backgroundColor}
        backdropFilter={backdropFilter}
        zIndex="9997"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="outline"
          aria-label={isOpen ? "close menu" : "open menu"}
          icon={isOpen ? <FiX /> : <FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          NASC
        </Text>

        <HStack spacing={{ base: "0", md: "6" }}>
          <IconButton
            size="md"
            variant="outline"
            aria-label="Toggle theme"
            rounded={"full"}
            icon={icon}
            onClick={toggleColorMode}
            marginLeft="4"
            marginRight="4"
          />

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    name={userInfo ? userInfo.name : ""}
                    bg="blue.400"
                    fontWeight={"bold"}
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {userInfo ? userInfo?.name?.toUpperCase() : ""}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {userInfo
                        ? Object.keys(userRoles)
                            .find((key) => userRoles[key] === userInfo.role)
                            .toUpperCase()
                        : ""}
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.700")}
                borderColor={useColorModeValue("gray.200", "gray.900")}
              >
                {userInfo ? (
                  <>
                    <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={<Navigate to="/login" replace />}>
                    Login
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <UpdateProfileModal
        isOpen={isUpdateProfieModelOpen}
        onClose={handleCloseModal}
      />
      <Box mt="20" />
    </>
  );
};
