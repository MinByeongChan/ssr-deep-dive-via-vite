import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppPrerender from './AppPrerender.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppPrerender error={null} data={[]} />
  </StrictMode>,
)
