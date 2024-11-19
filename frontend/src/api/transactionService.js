import axios from "axios";

export const getTransactionsByLoan = async (loanId) => {
  const response = await axios.get(`/api/transactions/loan/${loanId}`);
  return response.data;
};


export const createTransaction = async (transaction) => {
  const response = await axios.post("/api/transactions", transaction);
  return response.data;
};

export const deleteTransaction = async (transactionId) => {
  await axios.delete(`/api/transactions/${transactionId}`);
};
