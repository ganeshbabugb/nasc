import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination,
} from "@ajna/pagination";
import {
  ArrowBackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  chakra,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { Select } from "chakra-react-select";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { SyncLoader } from "react-spinners";
import { useTable } from "react-table";
import CustomBox from "../../components/CustomBox/CustomBox";
import IconCircle from "../../components/Icons/IconCircle";
import ChakraToast from "../../helpers/ChakraToast";
import { Link } from "react-router-dom";

const fetchData = async (pageSize, offset, searchTerm, sortBy, sortOrder) => {
  const searchQuery = searchTerm ? `&search=${searchTerm}` : "";
  const sortQuery = sortBy ? `&sortBy=${sortBy}&sortOrder=${sortOrder}` : "";
  return await fetch(
    `/api/studentDetails?limit=${pageSize}&offset=${offset}${searchQuery}${sortQuery}`
  ).then(async (res) => await res.json());
};

const StudentDetailTable = () => {
  // states
  const [totalCount, setTotalCount] = useState(undefined);
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchedColumns, setFetchedColumns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Model State
  const [selectedData, setSelectedData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: totalCount,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 10,
      isDisabled: false,
      currentPage: 1,
    },
  });

  // Handlers
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    // console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (selectedOption) => {
    const { value: newPageSize } = selectedOption;
    setPageSize(Number(newPageSize));
    setCurrentPage(1);
  };

  const handleSort = (columnId) => {
    if (sortBy === columnId && sortOrder === "desc") {
      // If already sorted in descending order, remove sorting
      setSortBy("");
      setSortOrder("");
    } else if (sortBy === columnId && sortOrder === "asc") {
      // If already sorted in ascending order, switch to descending order
      setSortOrder("desc");
    } else {
      // Sort by the selected column in ascending order
      setSortBy(columnId);
      setSortOrder("asc");
    }
  };

  const handleDownload = async () => {
    try {
      // Make the API request using your axios instance
      const response = await axios.get("/api/export-student-detail-to-excel", {
        responseType: "blob", // Set the response type to blob
      });

      // Extract the filename from the response headers
      const contentDisposition = response.headers["content-disposition"];
      let filename = "Details.xlsx";
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Save the file using file-saver
      saveAs(response.data, filename);
    } catch (error) {
      ChakraToast(
        "ERROR",
        "Error downloading Excel file",
        "error",
        3000,
        "bottom"
      );
      // console.error("Error downloading Excel file:", error);
    }
  };

  // Memo
  const columns = React.useMemo(() => fetchedColumns, [fetchedColumns]);
  const data = React.useMemo(() => fetchedData, [fetchedData]);

  // React Table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });

  // Theme
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Fetch Operations
  useEffect(() => {
    setIsLoading(true);
    fetchData(
      pageSize,
      (currentPage - 1) * pageSize,
      searchTerm,
      sortBy,
      sortOrder
    )
      .then((data) => {
        console.log("data", data);
        setTotalCount(data.count);
        setFetchedData(data.results);
      })
      .catch((error) => {
        ChakraToast("ERROR", error.message, "error", 3000, "bottom");
        // console.log("App =>", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, pageSize, searchTerm, sortBy, sortOrder]);

  // Seting Headers to the state
  useEffect(() => {
    const memoizedColumns = [
      {
        Header: "ACTIONS",
        accessor: "actions",
        Cell: ({ row }) => (
          <IconButton
            variant="unstyled"
            as="span"
            color="gray.500"
            onClick={() => {
              setSelectedData(row.original);
              onOpen();
            }}
            aria-label="View"
          >
            <AiOutlineEye />
          </IconButton>
        ),
      },
      {
        Header: "name",
        accessor: "user.name",
      },
      {
        Header: "user id",
        accessor: "user.id",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "year",
        accessor: "year",
      },
      {
        Header: "phone number",
        accessor: "mobileNumber",
      },
      {
        Header: "place",
        accessor: "place",
      },
    ];
    setFetchedColumns(memoizedColumns);
  }, [currentPage, pageSize, onOpen]);

  return (
    <Box minH="80vh">
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Link to="/">
            <ArrowBackIcon w={6} h={6} />
          </Link>
          <Heading as="h5" size="sm">
            STUDENT DETAILS TABLE
          </Heading>
          <Spacer />
          <IconCircle
            display="flex"
            bg="blue.300"
            color="white"
            onClick={handleDownload}
            cursor="pointer"
          >
            <Tooltip label="Export Table">
              <DownloadIcon />
            </Tooltip>
          </IconCircle>
        </Flex>
      </CustomBox>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ sm: "sm", md: "md", xl: "xl" }}
        finalFocusRef={btnRef}
        scrollBehavior={"inside"}
      >
        <ModalOverlay
          marginTop={"20"}
          marginLeft={{ sm: "0", md: "60", lg: "60" }}
        />
        <ModalContent
          marginTop={"28"}
          marginLeft={{ sm: "0", md: "60", lg: "60" }}
        >
          <ModalHeader>Student Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY="auto">
              {selectedData && (
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <div>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Name
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Gender
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Email
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Mobile Number
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Date of Birth
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Father's Name
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Father's Occupation
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Mother's Name
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Mother's Occupation
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Mother Tongue
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Languages Known
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      EMIS Number
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Aadhar Number
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      PAN Number
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Religion
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Community
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Community Certification Number
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Blood Group
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Is Physically Challenged
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Nationality
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      State
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      District
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Place
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Permanent Address
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                      isTruncated
                    >
                      Communication Address
                    </Text>
                  </div>
                  <div>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.userName}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.gender}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.email}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.mobileNumber}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {new Date(selectedData.dob).toLocaleDateString("en-GB")}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.fatherName}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.fatherOccupation}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.motherName}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.motherOccupation}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.motherTongue}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.languagesKnown}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.emisNumber}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.aadharNumber}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.panNumber}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.religion}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.community}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.communityCertificationNumber}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.bloodGroup}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.isPhysicalChallenged ? "Yes" : "No"}{" "}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.nationality}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.state}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.district}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.place}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.permanentAddress}
                    </Text>
                    <Text
                      isTruncated
                      fontWeight="bold"
                      fontSize={{ base: "sm", md: "sm", xl: "md" }}
                    >
                      : {selectedData.communicationAddress}
                    </Text>
                  </div>
                </Grid>
              )}
            </Box>
          </ModalBody>
          {/* <ModalFooter justifyContent={{ base: "flex-start", xl: "flex-end" }}> */}
          <ModalFooter justifyContent={"flex-start"}>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CustomBox>
        <Flex px={4} justify="space-between" align="center" marginY={3}>
          <Select
            isSearchable={false}
            onChange={handlePageSizeChange}
            size="sm"
            options={
              totalCount !== 0
                ? [
                    { label: "Show 10", value: "10" },
                    { label: "Show 50", value: "50" },
                    { label: "Show 75", value: "75" },
                    { label: "Show 100", value: "100" },
                  ]
                : []
            }
          />
          {/* Search Filter */}
          <InputGroup w="36">
            <Input
              borderRadius="xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`${
                totalCount === undefined ? "No" : totalCount
              } records...`}
              size="sm"
            />
            <InputRightElement color="gray.400" marginTop={"-1"}>
              <FaSearch />
            </InputRightElement>
          </InputGroup>
        </Flex>
        {/* Table */}
        {isLoading ? (
          <Flex
            w="100%"
            minH={"560px"}
            alignItems="center"
            justifyContent="center"
            background={"transparent"}
          >
            <SyncLoader color="#4299e1" loading={isLoading} size={25} />
          </Flex>
        ) : totalCount === 0 ? (
          <Text textAlign="center" mt={4}>
            No data available
          </Text>
        ) : (
          <Box
            overflowX="auto"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
          >
            <Table
              {...getTableProps()}
              variant="simple"
              color="gray.500"
              size={"sm"}
            >
              <Thead>
                {headerGroups.map((headerGroup, index) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps()}
                        pe="10px"
                        onClick={() => handleSort(column.id)}
                        key={index}
                        bg={"blue.400"}
                        paddingY={"3"}
                      >
                        <Flex
                          justify="space-between"
                          align="center"
                          fontSize={{ base: "10px", lg: "12px" }}
                          color="gray.50"
                        >
                          <Text whiteSpace={"nowrap"}>
                            {column.render("Header")}
                          </Text>
                          <chakra.span pl="4">
                            {sortBy === column.id ? (
                              sortOrder === "desc" ? (
                                <TriangleDownIcon />
                              ) : (
                                <TriangleUpIcon />
                              )
                            ) : null}
                          </chakra.span>
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell) => {
                        return (
                          <Td {...cell.getCellProps()}>
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize={{ base: "14px", lg: "16px" }}
                                fontWeight="700"
                              >
                                {cell.render("Cell")}
                              </Text>
                            </Flex>
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        )}

        {/* Pagination */}
        <Flex
          direction={{ base: "column", md: "row" }}
          marginY={3}
          justify="space-between"
          align="center"
        >
          <Box marginBottom={{ base: "2", md: "0" }}>
            <Text fontSize="sm">
              Showing{" "}
              <Text fontWeight="bold" as="span">
                {(currentPage - 1) * pageSize + 1}
              </Text>{" "}
              to{" "}
              <Text fontWeight="bold" as="span">
                {currentPage * pageSize > totalCount
                  ? totalCount
                  : currentPage * pageSize}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {totalCount}
              </Text>{" "}
              Results
            </Text>
          </Box>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isDisabled}
            onPageChange={handlePageChange}
          >
            <PaginationContainer
              align="center"
              justify="flex-end"
              marginBottom={{ base: "3", md: "0" }}
            >
              <PaginationPrevious variant="unstyled">
                <Tooltip label="Previous Page">
                  <IconButton variant="unstyled" as="span" color="gray.500">
                    <ChevronLeftIcon />
                  </IconButton>
                </Tooltip>
              </PaginationPrevious>
              <PaginationPageGroup
                align="center"
                separator={
                  <PaginationSeparator
                    variant="unstyled"
                    fontSize="md"
                    jumpSize={10}
                    p="0"
                  />
                }
              >
                {pages.map((page) => (
                  <PaginationPage
                    key={`pagination_page_${page}`}
                    page={page}
                    variant="unstyled"
                    fontSize="xs"
                    color={currentPage === page ? "gray.100" : "gray.600"}
                    borderRadius="full"
                    _hover={{
                      bg: currentPage === page ? "blue.400" : "gray.100",
                    }}
                    _current={{
                      bg: "blue.300",
                      fontSize: "sm",
                    }}
                    h={{ base: "32px", md: "40px" }}
                    w={{ base: "32px", md: "40px" }}
                  />
                ))}
              </PaginationPageGroup>
              <PaginationNext variant="unstyled">
                <Tooltip label="Next Page">
                  <IconButton variant="unstyled" as="span" color="gray.500">
                    <ChevronRightIcon />
                  </IconButton>
                </Tooltip>
              </PaginationNext>
            </PaginationContainer>
          </Pagination>
        </Flex>
      </CustomBox>
    </Box>
  );
};

export default StudentDetailTable;
