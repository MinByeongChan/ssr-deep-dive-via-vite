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
  
const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

// static files accessible
app.use('/client', express.static(distPath+'/client', { dotfiles: 'allow' }))
const baseUrl = process.env.BASE || '/'
const originTemplate = fs.readFileSync(path.join(distPath+'/client', 'index.html'), 'utf8');

app.get(/.*/, async (_req: express.Request, res: express.Response) => {
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base: baseUrl
    })

    app.use(vite.middlewares)

    try {
        const reactHtml = renderToString(<App />);
        const html = originTemplate.replace(`<!--ssr-outlet-->`, reactHtml);
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