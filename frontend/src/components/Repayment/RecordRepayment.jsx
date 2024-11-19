// import React from "react";

// const RepaymentForm = ({ onSubmit, initialData, loans }) => {
//   return (
//     <form
//       className="bg-white shadow-md rounded p-6 space-y-4 max-w-lg mx-auto"
//       onSubmit={onSubmit}
//     >
//       <h2 className="text-xl font-semibold text-gray-800">Repayment Form</h2>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">Loan</label>
//         <select
//           name="loanId"
//           defaultValue={initialData?.loanId || ""}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//         >
//           <option value="">Select Loan</option>
//           {loans.map((loan) => (
//             <option key={loan.id} value={loan.id}>
//               {loan.id}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Payment Date
//         </label>
//         <input
//           type="date"
//           name="paymentDate"
//           defaultValue={initialData?.paymentDate || ""}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Amount Paid
//         </label>
//         <input
//           type="number"
//           name="amountPaid"
//           defaultValue={initialData?.amountPaid || ""}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           placeholder="Enter Amount Paid"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700">
//           Remaining Balance
//         </label>
//         <input
//           type="number"
//           name="remainingBalance"
//           defaultValue={initialData?.remainingBalance || ""}
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           placeholder="Enter Remaining Balance"
//         />
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default RepaymentForm;




import React, { useState } from "react";
import axios from "axios";

const RecordRepayment = ({ loanId }) => {
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "/api/repayments",
        {
          loanId,
          paymentDate,
          amountPaid,
          paymentTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Repayment recorded successfully!");
      setPaymentDate("");
      setAmountPaid("");
      setPaymentTerm("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div>
      <h2>Record Repayment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Payment Date:
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </label>
        <label>
          Amount Paid:
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
        </label>
        <label>
          Payment Term:
          <input
            type="text"
            value={paymentTerm}
            onChange={(e) => setPaymentTerm(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default RecordRepayment;
