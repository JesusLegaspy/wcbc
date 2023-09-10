import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyProviders from './context/providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MyProviders>
      <App />
    </MyProviders>
  </React.StrictMode>
);
