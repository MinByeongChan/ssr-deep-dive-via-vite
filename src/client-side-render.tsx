import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// import './index.css'
// import { StrictMode } from 'react'
// import { hydrateRoot } from 'react-dom/client'
// import App from './App'

// hydrateRoot(
//   document.getElementById('root') as HTMLElement,
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )