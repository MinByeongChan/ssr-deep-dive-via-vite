import { Content } from './ui/Content';
import { Nav } from './ui/Nav';

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
  return (
    <div>
      <Nav />
      <Content error={error} data={data} />
    </div>
  )
}

export default AppPrerender
