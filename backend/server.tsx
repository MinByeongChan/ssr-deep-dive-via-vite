import React from 'react';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { createServer  } from 'vite'
import App from '../src/App.tsx'

// React 17+ JSX Transform이 tsx 실행 환경에서 제대로 동작하지 않을 때를 대비해 전역에 React 주입
if (typeof global.React === 'undefined') {
  (global as any).React = React;
}

interface PostContent {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface InitialProps {
    message: string;
    data: PostContent[] | null;
    error: string | null;
}

const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

// static files accessible
app.use('/client', express.static(distPath+'/client', { dotfiles: 'allow' }))
// app.use(/.*\.(svg|png|jpg|jpeg|gif|webp)$/, express.static(distPath+'/client', { dotfiles: 'allow' }))
const baseUrl = process.env.BASE || '/'
const originTemplate = fs.readFileSync(path.join(distPath+'/client', 'index.html'), 'utf8');

app.get(/.*/, async (req: express.Request, res: express.Response) => {
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base: baseUrl
    })

    app.use(vite.middlewares)

    try { 
        const initialProps: InitialProps = {
            message: 'SSR Test !',
            data: null,
            error: null
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        try { 
            const data = await response.json()
            console.log('data', data)
            initialProps.data = data;
        } catch (error) {
            initialProps.error = error;
            console.log('error', error)
        }

        const reactHtml = renderToString(
            <React.StrictMode>
                <App {...initialProps} />
            </React.StrictMode>
        );
        
        let html = originTemplate.replace(`<!--ssr-outlet-->`, reactHtml);
        
        // React Hydration Mismatch를 방지하기 위해 데이터 주입 스크립트는 root div 외부에 위치시킵니다.
        html = html.replace('</body>', `
            <script>
                window.__INITIAL_PROPS__ = ${JSON.stringify(initialProps)};
            </script>
            </body>
        `);

        console.log('html', html)
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    } catch (error) {
        console.error('Error', error)
        res.status(500).set({ 'Content-Type': 'text/html; charset=utf-8' }).end('Error');
    }
});

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// 타임아웃 설정 (ms)
server.setTimeout(5000);