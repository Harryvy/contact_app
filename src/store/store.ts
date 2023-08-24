import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    // Add other reducers if you have any
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
