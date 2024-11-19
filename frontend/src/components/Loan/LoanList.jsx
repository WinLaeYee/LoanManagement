// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function LoanList() {
//   const [loans, setLoans] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/loans/all");
//         setLoans(response.data);
//       } catch (err) {
//         setError("Failed to fetch loans.");
//       }
//     };
//     fetchLoans();
//   }, []);

//   return (
//     <div>
//       <h2>Loan List</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loans.length > 0 ? (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Borrower</th>
//               <th>Loan Amount</th>
//               <th>Loan Type</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Interest Rate</th>
//               <th>Total Repaid</th>
//               <th>Accrued Interest</th>
//               <th>Remaining Balance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loans.map((loan) => (
//               <tr key={loan._id}>
//                 <td>{loan.borrowerId}</td>
//                 <td>{loan.loanAmount}</td>
//                 <td>{loan.loanType}</td>
//                 <td>{new Date(loan.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(loan.endDate).toLocaleDateString()}</td>
//                 <td>{loan.interestRate}%</td>
//                 <td>{loan.totalRepaid}</td>
//                 <td>{loan.accruedInterest}</td>
//                 <td>{loan.remainingBalance}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No loans available.</p>
//       )}
//     </div>
//   );
// }

// export default LoanList;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function LoanList() {
//   const [loans, setLoans] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/loans/all");
//         setLoans(response.data);
//       } catch (err) {
//         setError("Failed to fetch loans.");
//         console.error(err.message);
//       }
//     };
//     fetchLoans();
//   }, []);

//   return (
//     <div>
//       <h2>Loan List</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loans.length > 0 ? (
//         <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
//           <thead>
//             <tr>
//               <th>Borrower</th>
//               <th>Loan Amount</th>
//               <th>Loan Type</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Interest Rate</th>
//               <th>Total Repaid</th>
//               <th>Accrued Interest</th>
//               <th>Remaining Balance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loans.map((loan) => (
//               <tr key={loan._id}>
//                 <td>{loan.borrowerId}</td>
//                 <td>{loan.loanAmount.toFixed(2)}</td>
//                 <td>{loan.loanType}</td>
//                 <td>{new Date(loan.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(loan.endDate).toLocaleDateString()}</td>
//                 <td>{loan.interestRate}%</td>
//                 <td>{loan.totalRepaid.toFixed(2)}</td>
//                 <td>{loan.accruedInterest.toFixed(2)}</td>
//                 <td>{loan.remainingBalance.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No loans found.</p>
//       )}
//     </div>
//   );
// }

// export default LoanList;


// src/components/Loan/LoanList.js
import React from "react";

const LoanList = ({ loans }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Loan List</h2>
      {loans.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.borrower}</td>
                <td>{loan.amount}</td>
                <td>{loan.type}</td>
                <td>{loan.startDate}</td>
                <td>{loan.endDate}</td>
                <td>
                  <button
                    onClick={() => onEdit(loan._id, { ...loan })}
                    className="mr-2 text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(loan._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loans available.</p>
      )}
    </div>
  );
};

export default LoanList;
