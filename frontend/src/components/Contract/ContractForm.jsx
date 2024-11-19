import React, { useState } from "react";

const ContractForm = ({ onSubmit }) => {
  const [loanId, setLoanId] = useState("");
  const [signingDate, setSigningDate] = useState("");
  const [contractDocument, setContractDocument] = useState(null);

  const handleFileChange = (e) => {
    setContractDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loanId || !signingDate || !contractDocument) {
      alert("Please fill all fields and upload a contract document.");
      return;
    }

    const formData = new FormData();
    formData.append("loanId", loanId);
    formData.append("signingDate", signingDate);
    formData.append("contractDocument", contractDocument);

    await onSubmit(formData);
    setLoanId("");
    setSigningDate("");
    setContractDocument(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="loanId" className="block font-semibold">
          Loan ID
        </label>
        <input
          type="text"
          id="loanId"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="signingDate" className="block font-semibold">
          Signing Date
        </label>
        <input
          type="date"
          id="signingDate"
          value={signingDate}
          onChange={(e) => setSigningDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="contractDocument" className="block font-semibold">
          Contract Document
        </label>
        <input
          type="file"
          id="contractDocument"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Contract
      </button>
    </form>
  );
};

export default ContractForm;
