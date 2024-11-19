// import React from "react";

// const RepaymentList = ({ repayments }) => {
//   return (
//     <ul className="space-y-4">
//       {repayments.map((repayment) => (
//         <li key={repayment._id} className="border p-4 rounded shadow">
//           <p><strong>Amount Paid:</strong> {repayment.amountPaid}</p>
//           <p><strong>Payment Term:</strong> {repayment.paymentTerm}</p>
//           <p><strong>Remaining Balance:</strong> {repayment.remainingBalance}</p>
//           <p><strong>Payment Date:</strong> {new Date(repayment.paymentDate).toLocaleDateString()}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default RepaymentList;

import React from "react";
import Repayment from "./Repayment"; 

const RepaymentList = ({ loanId }) => {
  return (
    <div>
      <h2>Loan Details</h2>
      {/* You can add other loan details here */}
      <Repayment loanId={loanId} />
    </div>
  );
};

export default RepaymentList;

