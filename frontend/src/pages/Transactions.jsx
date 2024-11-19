import React, { useState, useEffect } from "react";
import TransactionForm from "../components/Transaction/TransactionForm";
import TransactionList from "../components/Transaction/TransactionList";
import {
  createTransaction,
  getTransactionsByLoan,
  deleteTransaction,
} from "../api/transactionService";

const Transactions = ({ loanId }) => {
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionsByLoan(loanId);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [loanId]);

  
  const addTransaction = async (transaction) => {
    try {
      const newTransaction = await createTransaction(transaction);
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };


  const removeTransaction = async (id) => {
    try {
      
      console.log("Attempting to delete transaction with ID:", id);

      
      await deleteTransaction(id);

      
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t._id !== id)
      );

      console.log("Transaction deleted successfully.");
    } catch (error) {
      console.error("Error removing transaction:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Transaction Management {loanId}
      </h1>
      <TransactionForm loanId={loanId} onSubmit={addTransaction} />
      <TransactionList
        transactions={transactions}
        onDelete={removeTransaction}
      />
    </div>
  );
};

export default Transactions;
