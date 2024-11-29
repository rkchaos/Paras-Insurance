import { createRoot } from 'react-dom/client';
// importing components
import App from './App.jsx';
// importing styling
import './index.css';

import { ClientProvider } from './contexts/Client.context.jsx';

createRoot(document.getElementById('root')).render(
    <ClientProvider>
        <App />
    </ClientProvider>
);