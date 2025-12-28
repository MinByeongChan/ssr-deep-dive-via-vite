import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

interface PostContent {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface AppPrerenderProps {
  error: string | null;
  data: PostContent[] | null;
}

function AppPrerender({ error, data }: AppPrerenderProps) {
  const [count, setCount] = useState(0)

  console.log('AppPrerender')

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div>
        <h1>게시글 불러오기</h1>
        {error && <h1>Error: {error}</h1>}
        {!error && data && (
          <ul>
            {data?.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AppPrerender
