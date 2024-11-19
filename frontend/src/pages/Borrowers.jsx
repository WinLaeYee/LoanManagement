import React, { useState, useEffect } from "react";
import BorrowerForm from "../components/Borrower/BorrowerForm";
import BorrowerList from "../components/Borrower/BorrowerList";
import {
  createBorrower,
  getAllBorrowers,
  deleteBorrower,
} from "../api/borrowerService";

const Borrower = () => {
  const [borrowers, setBorrowers] = useState([]);

  // Fetch all borrowers on component mount
  useEffect(() => {
    const fetchBorrowers = async () => {
      try {
        const data = await getAllBorrowers();
        setBorrowers(data);
      } catch (error) {
        console.error("Error fetching borrowers:", error);
      }
    };
    fetchBorrowers();
  }, []);

  // Add borrower
  const addBorrower = async (borrower) => {
    try {
      const newBorrower = await createBorrower(borrower);
      setBorrowers([...borrowers, newBorrower]);
    } catch (error) {
      console.error("Error adding borrower:", error);
    }
  };

  // Delete borrower
  const removeBorrower = async (id) => {
    try {
      // Log the ID for debugging
      console.log("Attempting to delete borrower with ID:", id);

      // Call the delete API
      await deleteBorrower(id);

      // Filter out the deleted borrower from the state
      setBorrowers((prevBorrowers) =>
        prevBorrowers.filter((b) => b._id !== id)
      );

      console.log("Borrower deleted successfully.");
    } catch (error) {
      console.error("Error removing borrower:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Borrower Management</h1>
      <BorrowerForm onSubmit={addBorrower} />
      <BorrowerList borrowers={borrowers} onDelete={removeBorrower} />
    </div>
  );
};

export default Borrower;

