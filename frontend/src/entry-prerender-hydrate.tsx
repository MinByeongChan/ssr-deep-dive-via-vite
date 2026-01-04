import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import Prerender from './Prerender.tsx'
import type { PostContent } from './types.ts'

type InitialData = {
  error: string | null
  data: PostContent[] | null
}

// function getInitialData(): InitialData {
//   const el = document.getElementById('__INITIAL_DATA__')
//   if (!el) return { error: null, data: null }
//   try {
//     const parsed = JSON.parse(el.textContent || 'null')
//     if (parsed && typeof parsed === 'object') {
//       return parsed as InitialData
//     }
//   } catch {
//     // ignore parse error and fallback
//   }
//   return { error: null, data: null }
// }

// const initial = getInitialData()

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Prerender error={null} data={null} />
  </StrictMode>
)


