 import React, { useState } from "react";
import axios from "axios";

const RepaymentForm = ({ loanId }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [remainingBalance, setRemainingBalance] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const repaymentData = {
      loanId, 
      paymentDate,
      amountPaid: parseFloat(amountPaid),
      remainingBalance: parseFloat(remainingBalance),
      paymentTerm,
    };

    try {
      
      const response = await axios.post("/api/repayments", repaymentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });

      if (response.status === 201) {
        alert("Repayment recorded successfully!");
        
      }
    } catch (error) {
      if (error.response) {
        
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-2">Payment Date</label>
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Amount Paid</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Remaining Balance</label>
        <input
          type="number"
          value={remainingBalance}
          onChange={(e) => setRemainingBalance(e.target.value)}
          className="border rounded w-full p-2"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-2">Payment Term</label>
        <input
          type="text"
          value={paymentTerm}
          onChange={(e) => setPaymentTerm(e.target.value)}
          className="border rounded w-full p-2"
          placeholder="e.g., 12 months"
          required
        />
      </div>

    
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Record Repayment
      </button>
    </form>
  );
};

export default RepaymentForm;
