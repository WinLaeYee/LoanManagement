import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getAllBorrowers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/borrowers/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all borrowers:", error.message);
    throw error;
  }
};

export const createBorrower = async (borrower) => {
  try {
    console.log("Payload being sent:", borrower);
    const response = await axios.post(`${API_BASE_URL}/borrowers`, borrower);
    return response.data;
  } catch (error) {
    console.error("Error creating borrower:", error);
    throw error;
  }
};


export const updateBorrower = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/borrowers/${id}`, 
      updatedData 
    );
    return response.data; 
  } catch (error) {
    console.error("Error updating borrower:", error.message);
    throw error;
  }
};


export const deleteBorrower = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/borrowers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting borrower:", error.response?.data || error.message);
    throw error;
  }
};

