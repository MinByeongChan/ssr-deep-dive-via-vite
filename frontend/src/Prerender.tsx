import { Nav } from './ui/Nav'
import { Counter } from './ui/Counter'

interface PostContent {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function Prerender({ error, data }: { error: string | null, data: PostContent[] | null }) {
  return (
    <div>
     <Nav />
     <Counter />

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

export default Prerender
