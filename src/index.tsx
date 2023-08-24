import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css'; 
import { Provider } from 'react-redux'; // Import the Provider
import store from './store/store'; // Import your Redux store
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
  </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
);
