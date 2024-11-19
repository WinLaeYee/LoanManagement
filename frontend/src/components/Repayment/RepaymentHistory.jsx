import React, { useEffect, useState } from "react";
import axios from "axios";

const RepaymentHistory = ({ loanId }) => {
  const [repayments, setRepayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepayments = async () => {
      try {
        const response = await axios.get(`/api/repayments/loan/${loanId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRepayments(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred.");
      }
    };

    fetchRepayments();
  }, [loanId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Repayment History</h2>
      {repayments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Payment Date</th>
              <th>Amount Paid</th>
              <th>Remaining Balance</th>
              <th>Payment Term</th>
            </tr>
          </thead>
          <tbody>
            {repayments.map((repayment) => (
              <tr key={repayment._id}>
                <td>{new Date(repayment.paymentDate).toLocaleDateString()}</td>
                <td>{repayment.amountPaid}</td>
                <td>{repayment.remainingBalance}</td>
                <td>{repayment.paymentTerm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No repayments found.</p>
      )}
    </div>
  );
};

export default RepaymentHistory;
