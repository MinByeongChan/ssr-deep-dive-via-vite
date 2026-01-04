import { useEffect, useState } from 'react'
import { Nav } from './ui/Nav'
import { Counter } from './ui/Counter'

interface PostContent {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PostContent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      setError('Error: ' + error.message);
    });
  }, []);

  return (
    <div>
     <Nav />
     <Counter />

      <div>
        <h1>게시글 불러오기</h1>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error: {error}</h1>}
        {!loading && !error && data && (
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

export default App
