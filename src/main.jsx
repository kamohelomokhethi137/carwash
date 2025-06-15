import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { SnackbarProvider } from 'notistack';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    autoHideDuration={3000}>
    <App />
  </SnackbarProvider>
  </StrictMode>,
)
