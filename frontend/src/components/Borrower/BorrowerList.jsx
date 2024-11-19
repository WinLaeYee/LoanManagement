import React from "react";
import { Link } from "react-router-dom";

const BorrowerList = ({ borrowers, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded p-6 mt-8">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b">Full Name</th>
            <th className="text-left p-4 border-b">Phone</th>
            <th className="text-left p-4 border-b">Email</th>
            <th className="text-left p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.map((borrower) => (
            <tr key={borrower.id} className="hover:bg-gray-100">
              <td className="p-4 border-b">{borrower.fullName}</td>
              <td className="p-4 border-b">{borrower.contactInfo.phone}</td>
              <td className="p-4 border-b">{borrower.contactInfo.email}</td>
              <td className="p-4 border-b space-x-2">
              <Link
  to={`/borrower/${borrower._id}`} 
  className="text-blue-500 hover:underline"
>
  View Details
</Link>
<button
  className="text-red-500 hover:underline ml-4"
  onClick={() => onDelete(borrower._id)} 
>
  Delete
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowerList;
