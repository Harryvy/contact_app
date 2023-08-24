import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../store/contactsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';

type RouteParams = {
  id: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  phoneNumber: string;
  // Other properties
};

const ContactEditForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();

  const contactToEdit: Contact | undefined = useSelector((state: RootState) =>
    state.contacts.contacts.find(contact => contact.id === id)
  );

  const [name, setName] = useState<string>(contactToEdit?.name || '');
  const [email, setEmail] = useState<string>(contactToEdit?.email || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(contactToEdit?.status || 'active');
  const [phoneNumber, setPhoneNumber] = useState<string>(contactToEdit?.phoneNumber || '');

  const isNameValid = /^[A-Za-z\s]+$/.test(name);
  const isPhoneNumberValid = /^[0-9]{10}$/.test(phoneNumber);

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setStatus(contactToEdit.status);
      setPhoneNumber(contactToEdit.phoneNumber);
    }
  }, [contactToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isNameValid || !isPhoneNumberValid) {
      return; 
    }

    if (contactToEdit) {
      const updatedContact: Contact = {
        id: contactToEdit.id,
        name,
        email,
        status,
        phoneNumber,
        // Update other contact properties
      };

      dispatch(updateContact(updatedContact));
    }

    navigate('/');
  };

  if (!contactToEdit) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
              isNameValid ? '' : 'border-red-500'
            }`}
          />
          {!isNameValid && (
            <p className="text-red-500">Please enter a valid name</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status:</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as 'active' | 'inactive')}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
              isPhoneNumberValid ? '' : 'border-red-500'
            }`}
          />
          {!isPhoneNumberValid && (
            <p className="text-red-500">Please enter valid ph-No</p>
          )}
        </div>

        {/* Update other input fields */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ContactEditForm;
