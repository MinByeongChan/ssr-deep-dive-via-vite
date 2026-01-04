import type { PostContent } from '../types';
import { Images } from './Images';
import { Counter } from './Counter';

interface ContentProps {
  error: string | null;
  data: PostContent[] | null;
}

export const Content = ({ error, data }: ContentProps) => {
    return (
        <>
        <Images />
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
        </>
    )
}