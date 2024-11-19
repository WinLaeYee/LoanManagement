import React from "react";

const TransactionList = ({ transactions }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded p-6 mt-8">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b">Transaction ID</th>
            <th className="text-left p-4 border-b">Loan ID</th>
            <th className="text-left p-4 border-b">Date</th>
            <th className="text-left p-4 border-b">Type</th>
            <th className="text-left p-4 border-b">Amount</th>
            <th className="text-left p-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100">
              <td className="p-4 border-b">{transaction.id}</td>
              <td className="p-4 border-b">{transaction.loanId}</td>
              <td className="p-4 border-b">{transaction.date}</td>
              <td className="p-4 border-b">{transaction.type}</td>
              <td className="p-4 border-b">{transaction.amount}</td>
              <td className="p-4 border-b">
                {transaction.description || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
