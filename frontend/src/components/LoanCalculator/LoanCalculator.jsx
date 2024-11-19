import React, { useState } from "react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const totalPayments = parseFloat(loanTerm) * 12;

    if (principal && monthlyRate && totalPayments) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);

      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment("Invalid input");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Loan Calculator</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Loan Amount ($)"
          className="w-full p-2 border rounded"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          className="w-full p-2 border rounded"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Loan Term (Years)"
          className="w-full p-2 border rounded"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />
        <button
          onClick={calculateMonthlyPayment}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
        {monthlyPayment && (
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold">Monthly Payment</h3>
            <p className="text-green-500 text-2xl">${monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
