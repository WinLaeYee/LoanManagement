import React from "react";

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Transactions List
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-600">No transactions found for this loan.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {transaction.transactionType}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(transaction.transactionDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">${transaction.amount}</p>
                <p className="text-sm text-gray-500">
                  {transaction.description}
                </p>
              </div>

              <button
                onClick={() => onDelete(transaction._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
