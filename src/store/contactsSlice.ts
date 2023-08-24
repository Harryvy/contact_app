import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../types'; // Define the Contact type

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const updatedIndex = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.contacts[updatedIndex] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;

export default contactsSlice.reducer;
