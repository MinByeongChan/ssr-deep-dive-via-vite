import type { PostContent } from '../types';

interface ContentProps {
  error: string | null;
  data: PostContent[] | null;
}

export const Content = ({ error, data }: ContentProps) => {
    return (
        <>
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