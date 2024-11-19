import React, { useState, useEffect } from "react";
import ContractForm from "../components/Contract/ContractForm";
import ContractList from "../components/Contract/ContractList";
import {
  createContract,
  getAllContracts,
  deleteContract,
} from "../api/contractService";

const Contract = () => {
  const [contracts, setContracts] = useState([]);

  // Fetch all contracts on component mount
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getAllContracts();
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };
    fetchContracts();
  }, []);

  // Add contract
  const addContract = async (contract) => {
    try {
      const newContract = await createContract(contract);
      setContracts([...contracts, newContract]);
    } catch (error) {
      console.error("Error adding contract:", error);
    }
  };

  // Delete contract
  const removeContract = async (id) => {
    try {
      await deleteContract(id);
      setContracts(contracts.filter((contract) => contract._id !== id));
    } catch (error) {
      console.error("Error removing contract:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contract Management</h1>
      <ContractForm onSubmit={addContract} />
      <ContractList contracts={contracts} onDelete={removeContract} />
    </div>
  );
};

export default Contract;
