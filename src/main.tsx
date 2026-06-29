import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for offline capability
if ('serviceWorker' in navigator && window.location.protocol !== 'file:' && !(window as any).__OFFLINE__) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('BatikMath SW registered successfully with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('BatikMath SW registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
