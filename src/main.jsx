import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ Bien fermer la parenthèse à la fin !
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)