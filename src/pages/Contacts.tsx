import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import ContactList from '../components/ContactList';
import ContactDetails from '../components/ContactDetails';
import ContactForm from '../components/ContactForm';
import ContactEditForm from 'components/ContactEditForm';

const Contacts: React.FC = () => {
  const navigate = useNavigate();

  const moveToAddContact = () => {
    navigate('/add');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <button
          onClick={moveToAddContact}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Contact
        </button>
      </div>
      
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="add" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactDetails />} />
        <Route path=":id/edit" element={<ContactEditForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Contacts;
