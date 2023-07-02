import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants/config";
import BankDetailsForm from "./forms/BankDetailsForm";
import Loading from "./results/loading/Loading";

async function getBankDetails() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/bank-detail`, {
      withCredentials: true,
    });

    // console.log("response:", response);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch bank details.");
    console.log("error:", error);
    return null;
  }
}

function BankDetailsScreen() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankDetails = await getBankDetails();
        setData(bankDetails);
      } catch (error) {
        console.log("error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <BankDetailsForm preloadedValues={data} />;
}

export default BankDetailsScreen;
