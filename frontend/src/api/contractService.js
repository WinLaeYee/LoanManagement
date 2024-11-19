import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAllContracts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contracts/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contracts:", error.message);
    throw error;
  }
};

export const createContract = async (contract) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contracts`, contract);
    return response.data;
  } catch (error) {
    console.error("Error creating contract:", error.message);
    throw error;
  }
};

export const deleteContract = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/contracts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting contract:", error.message);
    throw error;
  }
};
