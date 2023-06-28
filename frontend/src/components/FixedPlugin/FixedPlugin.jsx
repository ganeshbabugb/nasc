import { Button, Portal, useColorModeValue } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import Configurator from "./Configator";
import { useDisclosure } from "@chakra-ui/hooks";

const FixedPlugin = () => {
  // Add your configurakor logic and UI here

  const BGC = useColorModeValue("white", "gray.700");
  const TC = useColorModeValue("gray.500", "gray.200");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Portal>
        <Button
          h="52px"
          w="52px"
          position="fixed"
          bg={BGC}
          variant="no-hover"
          left={""}
          right={"35px"}
          bottom="30px"
          borderRadius="50px"
          zIndex="9999"
          boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
          borderColor={TC}
          onClick={isOpen ? onClose : onOpen}
        >
          <SettingsIcon cursor="pointer" color={TC} w="20px" h="20px" />
        </Button>
      </Portal>
      <Configurator isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default FixedPlugin;
