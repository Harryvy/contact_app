import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../store/contactsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';

type RouteParams = {
  id?: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  phoneNumber: string;
  // Other properties
};

const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();
  const isEditing = !!id;

  const initialContact: Contact | undefined = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  const [name, setName] = useState<string>(initialContact?.name || '');
  const [email, setEmail] = useState<string>(initialContact?.email || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(initialContact?.status || 'active');
  const [phoneNumber, setPhoneNumber] = useState<string>(initialContact?.phoneNumber || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact: Contact = {
      id: isEditing ? id! : String(Math.random()), // Replace with a proper ID generation method
      name,
      email,
      status,
      phoneNumber,
      // Add other contact properties
    };

    if (isEditing) {
      dispatch(updateContact(newContact));
    } else {
      dispatch(addContact(newContact));
    }

    navigate('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block font-medium">Status:</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as 'active' | 'inactive')}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Add other input fields */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isEditing ? 'Save Changes' : 'Add '}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
