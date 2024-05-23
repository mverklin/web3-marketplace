import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Make sure this line is included to import the CSS file

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
