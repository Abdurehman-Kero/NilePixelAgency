import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { keepBackendWarm, prefetchPublicData } from './services/dataCache';

// Start loading (and waking the server) before React has even mounted.
prefetchPublicData();
keepBackendWarm();

ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode>
 <App />
 </React.StrictMode>
);
