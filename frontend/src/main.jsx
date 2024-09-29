import { StrictMode } from 'react' // Importing StrictMode for highlighting potential problems in the application
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Creating the root element in the DOM and rendering the App component within StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
