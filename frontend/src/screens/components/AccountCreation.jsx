import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { read, utils } from "xlsx";
import CustomBox from "../../components/CustomBox/CustomBox";
import ChakraToast from "../../helpers/ChakraToast";
import { API_BASE_URL } from "../../utils/constants/config";
import { userRoles } from "../../utils/constants/roles";

const API_URL = {
  superadmin: "/api/create-admin-with-department",
  admin: "/api/create-staff",
  staff: "/api/create-student",
};

const AccountCreation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo
    ? Object.keys(userRoles).find((key) => userRoles[key] === userInfo.role)
    : null;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleAccountCreation = () => {
    if (selectedFile) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);

        createAccounts(jsonData);
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const createAccounts = (data) => {
    const userData = data.map((item) => ({
      ...item,
      department:
        userInfo.role !== userRoles.superadmin
          ? userInfo.department
          : undefined,
    }));
    // Make a POST request to the backend API endpoint
    fetch(API_BASE_URL + API_URL[role], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to create user accounts. Please try again later."
          );
        }
        return response.json();
      })
      .then((result) => {
        // Handle the response from the server
        console.log(result);
        ChakraToast(
          "Success",
          "User accounts created successfully!",
          "success",
          3000
        );
      })
      .catch((error) => {
        console.log("error:", error);
        // Handle any errors
        console.error(error);
        ChakraToast(
          "ERROR",
          "An error occurred while creating user accounts.",
          "error",
          3000
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CustomBox>
      <FormControl>
        <FormLabel htmlFor="fileUpload" mb={2}>
          Select File:
        </FormLabel>
        <Button
          as="label"
          htmlFor="fileUpload"
          leftIcon={<FiUpload />}
          colorScheme="teal"
          cursor="pointer"
        >
          Upload
          <input
            id="fileUpload"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </Button>
        {selectedFile && (
          <Text mt={2} fontSize="sm" color="gray.500">
            Selected File: {selectedFile.name}
          </Text>
        )}
        <FormHelperText color={"gray.500"}>
          To create an accounts, upload an xls, xlsx or ods file with the
          following columns: id, name, password.
        </FormHelperText>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleAccountCreation}
        isLoading={isLoading}
        loadingText="Creating..."
      >
        Create Accounts
      </Button>
    </CustomBox>
  );
};

export default AccountCreation;
