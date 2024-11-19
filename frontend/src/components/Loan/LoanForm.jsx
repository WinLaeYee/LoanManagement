
import React, { useState, useEffect } from "react";
import axios from "axios";

function LoanForm({ onSubmit }) {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    borrowerId: "", 
    loanAmount: "",
    loanType: "Personal",
    startDate: "",
    endDate: "",
    interestRate: "",
  });


  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/borrowers/all"
        ); 
        setBorrowers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching borrowers:", err);
        setError("Failed to load borrowers.");
        setLoading(false);
      }
    };

    fetchBorrowers();
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoanSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loans",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // if you're using JWT authentication
          },
        }
      );
      console.log(response.data); // Check the response data
    } catch (error) {
      console.error("Error creating loan:", error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoanSubmit(formData); // Call handleLoanSubmit when the form is submitted

    if (!formData.borrowerId) {
      alert("Please select a borrower.");
      return;
    }
    onSubmit(formData);
    setFormData({
      borrowerId: "",
      loanAmount: "",
      loanType: "Personal",
      startDate: "",
      endDate: "",
      interestRate: "",
    });
  };

  return (
    <form
      className="bg-white shadow-md rounded p-6 space-y-4 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-800">Loan Form</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Borrower
        </label>
        {loading ? (
          <p>Loading borrowers...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <select
            name="borrowerId"
            value={formData.borrowerId}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select Borrower</option>
            {borrowers.map((borrower) => (
              <option key={borrower._id} value={borrower._id}>
                {borrower.fullName}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Amount
        </label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          placeholder="Enter Loan Amount"
          className="block w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Loan Type
        </label>
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
        >
          <option value="Personal">Personal</option>
          <option value="Mortgage">Mortgage</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interest Rate (%)
        </label>
        <input
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          placeholder="Enter Interest Rate"
          className="block w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default LoanForm;
