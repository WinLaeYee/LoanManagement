import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllBorrowers } from "../../api/borrowerService";

const BorrowerDetail = () => {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);

  useEffect(() => {
    const fetchBorrower = async () => {
      try {
        const allBorrowers = await getAllBorrowers();
        const borrowerData = allBorrowers.find((b) => b._id === id); 
        setBorrower(borrowerData);
      } catch (error) {
        console.error("Error fetching borrower details:", error);
      }
    };
    fetchBorrower();
  }, [id]);

  if (!borrower) {
    return <p>Loading borrower details...</p>;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold">{borrower.fullName}</h1>
      <p>Phone: {borrower.contactInfo.phone}</p>
      <p>Email: {borrower.contactInfo.email}</p>
      <p>Address: {borrower.address}</p>
      <p>Identification Number: {borrower.identificationNumber}</p>
    </div>
  );
};

export default BorrowerDetail;
