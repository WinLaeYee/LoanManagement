import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Borrower from "./pages/Borrowers";
import Loan from "./pages/Loans";
import Repayment from "./pages/Repayments";
import Transaction from "./pages/Transactions";
import Contract from "./pages/Contracts";
import LoanCalculator from "./components/LoanCalculator/LoanCalculator";
import BorrowerDetail from "./components/Borrower/BorrowerDetail";
import './index.css'

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
          <div className="p-6 text-center">
            <h1 className="text-xl font-bold">Loan Management</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/borrower"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Borrowers
                </Link>
              </li>
              <li>
                <Link
                  to="/loan"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Loans
                </Link>
              </li>
              <li>
                <Link
                  to="/repayment"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Repayments
                </Link>
              </li>
              <li>
                <Link
                  to="/transaction"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/contract"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Contracts
                </Link>
              </li>
              <li>
                <Link
                  to="/loan-calculator"
                  className="block px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Loan Calculator
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded shadow p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/borrower" element={<Borrower />} />
              <Route path="/borrower/:id" element={<BorrowerDetail />} />

              <Route path="/loan" element={<Loan />} />
              <Route path="/repayment" element={<Repayment />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/loan-calculator" element={<LoanCalculator />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;


