import { useState } from 'react'
import { Content } from './ui/Content';

interface PostContent {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App({ message, data, error }: { message: string, data: PostContent[] | null, error: string | null }) {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h1>{message}</h1>
      <p>{count} count</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Click Me
      </button>

      <Content error={error} data={data} />
    </div>
  )
}

export default App
