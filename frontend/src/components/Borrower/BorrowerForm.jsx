

import React, { useState } from "react";

const BorrowerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    contactInfo: { phone: "", email: "" },
    address: "",
    identificationNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "email"].includes(name)) {
      setFormData({
        ...formData,
        contactInfo: { ...formData.contactInfo, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.address ||
      !formData.identificationNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!formData.contactInfo.phone || !formData.contactInfo.email) {
      alert("Please provide valid contact details.");
      return;
    }

    try {
      // Simulate an API call
      const response = await onSubmit(formData);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        alert("Form submitted and token saved successfully.");
      } else {
        alert("Form submitted, but no token was returned.");
      }

      
      setFormData({
        fullName: "",
        contactInfo: { phone: "", email: "" },
        address: "",
        identificationNumber: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded p-6 space-y-4 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-800">Borrower Form</h2>

      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="block w-full p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        value={formData.contactInfo.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="block w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.contactInfo.email}
        onChange={handleChange}
        placeholder="Email"
        className="block w-full p-2 border rounded"
      />
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="block w-full p-2 border rounded"
      ></textarea>
      <input
        type="text"
        name="identificationNumber"
        value={formData.identificationNumber}
        onChange={handleChange}
        placeholder="Identification Number"
        className="block w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2">
        Submit
      </button>
    </form>
  );
};

export default BorrowerForm;
