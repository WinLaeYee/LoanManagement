import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";


export const getRepaymentsByLoan = async (loanId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/repayments/loan/${loanId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching repayments by loan:", error.message);
    throw error;
  }
};


export const createRepayment = async (repayment) => {
  try {
    console.log("Payload being sent:", repayment);
    const response = await axios.post(`${API_BASE_URL}/repayments`, repayment);
    return response.data;
  } catch (error) {
    console.error("Error creating repayment:", error.message);
    throw error;
  }
};


export const updateRepayment = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/repayments/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating repayment:", error.message);
    throw error;
  }
};
export const deleteRepayment = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/repayments/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting repayment:", error.message);
    throw error;
  }
};
