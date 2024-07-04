import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ToastrProvider from './providers/toastrProvider';
import './css/style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ToastrProvider position='top-center'>
        <App />
      </ToastrProvider>
    </Router>
  </React.StrictMode>,
);
