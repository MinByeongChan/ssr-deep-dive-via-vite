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
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>메롱</title>
        </head>
        <AppPrerender error={error} data={data} />
      </html>
    </StrictMode>
  )
}

export {
  render
}