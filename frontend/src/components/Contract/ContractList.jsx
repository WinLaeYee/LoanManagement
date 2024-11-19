import React from "react";

const ContractList = ({ contracts, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contracts</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Loan ID</th>
            <th className="border px-4 py-2">Signing Date</th>
            <th className="border px-4 py-2">Contract Document</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract._id}>
              <td className="border px-4 py-2">{contract.loanId}</td>
              <td className="border px-4 py-2">{contract.signingDate}</td>
              <td className="border px-4 py-2">
                <a
                  href={`/contracts/download/${contract.loanId}`}
                  target="_blank"
                >
                  Download
                </a>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => onDelete(contract._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractList;
