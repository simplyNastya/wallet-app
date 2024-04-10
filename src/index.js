import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './stylesheet/main.scss';
import 'modern-normalize';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
