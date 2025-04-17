

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <App /> // ❌ Remove <StrictMode> for debugging
  );
} else {
  console.error('Failed to find the root element');
}
