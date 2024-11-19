

// import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api";

// export const getAllLoans = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/loans/all`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching loans:", error.message);
//     throw error;
//   }
// };

// export const createLoan = async (loan) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/loans`, loan);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating loan:", error.message);
//     throw error;
//   }
// };

// export const updateLoan = async (id, updatedData) => {
//   try {
//     const response = await axios.put(
//       `${API_BASE_URL}/loans/${id}`,
//       updatedData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error updating loan:", error.message);
//     throw error;
//   }
// };

// export const deleteLoan = async (id) => {
//   try {
//     await axios.delete(`${API_BASE_URL}/loans/${id}`);
//   } catch (error) {
//     console.error("Error deleting loan:", error.message);
//     throw error;
//   }
// };


// src/api/loanService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/loans";

export const getAllLoans = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const createLoan = async (loan) => {
  const response = await axios.post(BASE_URL, loan);
  return response.data;
};

export const updateLoan = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteLoan = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
