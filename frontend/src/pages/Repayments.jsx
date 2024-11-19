import React, { useState, useEffect } from "react";
import RepaymentForm from "../components/Repayment/RepaymentForm";
import RepaymentList from "../components/Repayment/RepaymentList";
import { createRepayment, getRepaymentsByLoan } from "../api/repaymentService";

const Repayment = ({ loanId }) => {
  const [repayments, setRepayments] = useState([]);

  useEffect(() => {
    const fetchRepayments = async () => {
      try {
        const data = await getRepaymentsByLoan(loanId);
        setRepayments(data);
      } catch (error) {
        console.error("Error fetching repayments:", error);
      }
    };
    fetchRepayments();
  }, [loanId]);

  const addRepayment = async (repayment) => {
    try {
      const newRepayment = await createRepayment(repayment);
      setRepayments((prev) => [...prev, newRepayment]);
    } catch (error) {
      console.error("Error adding repayment:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Repayment Management</h1>
      <RepaymentForm onSubmit={addRepayment} loanId={loanId} />
      <RepaymentList repayments={repayments} />
    </div>
  );
};

export default Repayment;
