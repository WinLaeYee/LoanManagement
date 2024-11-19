import React, { useState } from "react";
import { createTransaction } from "../../api/transactionService";

const TransactionForm = ({ loanId, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("Repayment");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      loanId,
      transactionDate: new Date(),
      transactionType,
      amount: parseFloat(amount),
      description,
    };

    try {
      await onSubmit(newTransaction);
      setAmount("");
      setDescription("");
      setError("");
    } catch (err) {
      setError("Error adding transaction: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Add Transaction
      </h2>

      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-gray-600 font-medium mb-2"
        >
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="transactionType"
          className="block text-gray-600 font-medium mb-2"
        >
          Transaction Type
        </label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="Repayment">Repayment</option>
          <option value="Late Fee">Late Fee</option>
          <option value="Penalty">Penalty</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-600 font-medium mb-2"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
