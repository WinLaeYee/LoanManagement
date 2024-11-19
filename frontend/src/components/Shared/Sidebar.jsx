import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/borrowers">Borrowers</Link>
        </li>
        <li>
          <Link to="/loans">Loans</Link>
        </li>
        <li>
          <Link to="/repayments">Repayments</Link>
        </li>
        <li>
          <Link to="/interest-rates">Interest Rates</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/contracts">Contracts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
