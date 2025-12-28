import { StrictMode } from 'react'
import App from './App.tsx'

const render = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

export {
  render
}