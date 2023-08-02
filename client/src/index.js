import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './index.css';
import App from './App';
import {Appprovider} from './context/globalcontext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Appprovider>
      <App />
  </Appprovider>
  </React.StrictMode>
);

