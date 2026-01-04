import { StrictMode } from 'react'
import type { PostContent } from './types.ts';

export async function render() {
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
          <title>프리렌더</title>
        </head>
        <body>
          <div id="root">
            {/* <Prerender error={error} data={data} /> */}
          </div>
          <script
            id="__INITIAL_DATA__"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({ error, data }),
            }}
          />
          <script type="module" src="/frontend/src/entry-prerender-hydrate.tsx"></script>
        </body>
      </html>
    </StrictMode>
  )
}