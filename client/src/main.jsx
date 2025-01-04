import { createRoot } from 'react-dom/client';
// importing components
import App from './App.jsx';
import { ClientProvider } from './contexts/Client.context.jsx';
import { SnackBarProvider } from './contexts/SnackBar.context.jsx';
import { ConfirmationDialogProvider } from './contexts/ConfirmationDialog.context.jsx';
// importing styling
import './index.css';

createRoot(document.getElementById('root')).render(
    <ClientProvider>
        <SnackBarProvider>
            <ConfirmationDialogProvider>
                <App />
            </ConfirmationDialogProvider>
        </SnackBarProvider>
    </ClientProvider>
);