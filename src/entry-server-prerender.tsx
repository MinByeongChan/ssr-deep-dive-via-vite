import { StrictMode } from 'react'
import AppPrerender from './AppPrerender.tsx'

interface PostContent {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const render = async () => {
  let data: PostContent[] | null = null;
  let error: string | null = null;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    data = await response.json();
  } catch (caughtError: unknown) {
    error = String('Error: ' + (caughtError instanceof Error ? caughtError.message : String(caughtError)));
  }

  return (
    <StrictMode>
      <AppPrerender error={error} data={data} />
    </StrictMode>
  )
}

export {
  render
}