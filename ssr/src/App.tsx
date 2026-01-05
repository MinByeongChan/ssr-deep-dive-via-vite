import React, { useEffect, useState } from 'react'
import { Content } from './ui/Content';
import type { PostContent } from './types';


function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PostContent[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      try { 
        setData(await response.json() as PostContent[])
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  
  return (
    <div>
      <h1>SSR Test !</h1>
      <p>{count} count</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Click Me
      </button>

      {loading && <p>Loading...</p>}
      {!loading && <Content data={data} error={error} />}
    </div>
  )
}

export default App
