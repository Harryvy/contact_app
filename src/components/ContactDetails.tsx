import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type RouteParams = {
  id: string; // Make sure the parameter name matches the route configuration
}

const ContactDetails: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const contact = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  if (!contact) {
    return <div className="text-red-500">Contact not found</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold">{contact.name}</h2>
        <p className="mt-2"><strong>Email:</strong> {contact.email}</p>
        <p><strong>Status:</strong> {contact.status}</p>
        <p><strong>Phone Number:</strong> {contact.phoneNumber}</p>
        {/* Display other contact details */}
      </div>
    </div>
  );
};

export default ContactDetails;
