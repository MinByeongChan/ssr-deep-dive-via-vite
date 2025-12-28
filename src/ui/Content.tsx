import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import type { PostContent } from '../types';

interface ContentProps {
  error: string | null;
  data: PostContent[] | null;
}

export const Content = ({ error, data }: ContentProps) => {
    const [count, setCount] = useState(0)
    return (
        <>
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
        </>
    )
}