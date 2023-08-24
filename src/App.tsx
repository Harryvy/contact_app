import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Contacts from './pages/Contacts';
import ContactDetails from 'components/ContactDetails';
import ChartsAndMaps from 'components/ChartsAndMaps';

const App: React.FC = () => {
  return (


    <Router>
      <h1 className="text-4xl font-bold text-blue-600 mx-auto mb-4">Contact Management App</h1>
        <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/charts-and-maps" className="hover:text-gray-300">
              Charts & Maps
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/*" element={<Contacts />} />
        <Route path="/contacts/:id" element={<ContactDetails/>} />
        <Route path="/charts-and-maps" element={<ChartsAndMaps/>} />

      </Routes>
    </Router>
  );
};

export default App;
