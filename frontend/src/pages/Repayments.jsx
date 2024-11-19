import React, { useState, useEffect } from "react";
import {
  getRepaymentsByLoan,
  createRepayment,
  deleteRepayment,
} from "../api/repaymentService";

const Repayment = ({ loanId }) => {
  const [repayments, setRepayments] = useState([]);
  const [repaymentData, setRepaymentData] = useState({
    amountPaid: "",
    paymentDate: "",
    paymentTerm: "12 months", // default value
  });


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

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepaymentData({ ...repaymentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRepayment = await createRepayment({ loanId, ...repaymentData });
      setRepayments([...repayments, newRepayment]);
      setRepaymentData({
        amountPaid: "",
        paymentDate: "",
        paymentTerm: "12 months",
      });
    } catch (error) {
      console.error("Error adding repayment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRepayment(id);
      setRepayments(repayments.filter((repayment) => repayment._id !== id));
    } catch (error) {
      console.error("Error deleting repayment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">
        Repayment Management
      </h2>

      {/* Repayment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex space-x-4">
          <input
            type="number"
            name="amountPaid"
            value={repaymentData.amountPaid}
            onChange={handleChange}
            placeholder="Amount Paid"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            name="paymentDate"
            value={repaymentData.paymentDate}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <select
          name="paymentTerm"
          value={repaymentData.paymentTerm}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="12 months">12 months</option>
          <option value="6 months">6 months</option>
          <option value="3 months">3 months</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Record Repayment
        </button>
      </form>

  
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Repayments for Loan {loanId}
        </h3>
        <ul className="space-y-4">
          {repayments.map((repayment) => (
            <li
              key={repayment._id}
              className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-medium text-gray-800">
                Amount: {repayment.amountPaid}
              </p>
              <p className="text-gray-600">
                Payment Date:{" "}
                {new Date(repayment.paymentDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Remaining Balance: {repayment.remainingBalance}
              </p>
              <button
                onClick={() => handleDelete(repayment._id)}
                className="mt-2 text-red-600 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Repayment;
