import React, { useState, useEffect } from "react";
import LoanForm from "../components/Loan/LoanForm";
import LoanList from "../components/Loan/LoanList";
import { getAllLoans, createLoan, updateLoan, deleteLoan } from "../api/loanService";

const Loan = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await getAllLoans();
        setLoans(data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };
    fetchLoans();
  }, []);

  // Add loan
  const addLoan = async (loan) => {
    try {
      const newLoan = await createLoan(loan);
      setLoans([...loans, newLoan]);
    } catch (error) {
      console.error("Error adding loan:", error);
    }
  };

  // Update loan
  const editLoan = async (id, updatedData) => {
    try {
      const updatedLoan = await updateLoan(id, updatedData);
      setLoans(loans.map((loan) => (loan._id === id ? updatedLoan : loan)));
    } catch (error) {
      console.error("Error updating loan:", error);
    }
  };

  // Delete loan
  const removeLoan = async (id) => {
    try {
      await deleteLoan(id);
      setLoans(loans.filter((loan) => loan._id !== id));
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Loan Management</h1>
      <LoanForm onSubmit={addLoan} />
      {/* <LoanList loans={loans}/> */}
    </div>
  );
};

export default Loan;

