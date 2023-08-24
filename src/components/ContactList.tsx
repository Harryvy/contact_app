import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store'; 
import { Link } from 'react-router-dom';
import { deleteContact } from '../store/contactsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = (contactId: string) => {
    // Dispatch the delete action to Redux store
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts present.</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map(contact => (
            <div key={contact.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <div className="flex mt-2">
                <Link to={`/contacts/${contact.id}`} className="text-blue-500 hover:underline mr-2">
                  <FontAwesomeIcon icon={faEye} className="mr-1" />
                  View
                </Link>
                <Link to={`/${contact.id}/edit`} className="text-green-500 hover:underline mr-2">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
