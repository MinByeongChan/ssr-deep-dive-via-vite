import { useEffect, useState } from 'react'
import { Content } from './ui/Content';

interface PostContent {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState<PostContent[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        try { 
            const data = await response.json()
            console.log('data', data)
            setData(data)
        } catch (error) {
            setError((error as Error).message)
        }
      }
    fetchData()
  }, [])
  
  return (
    <div>
      <h1>Hello World</h1>
      <p>{count} count</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Click Me
      </button>

      <Content error={error} data={data} />
    </div>
  )
}

export default App
