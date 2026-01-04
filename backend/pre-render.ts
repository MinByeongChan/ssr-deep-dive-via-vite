import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { createServer  } from 'vite'
import fs from 'fs';

const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

const baseUrl = process.env.BASE || '/'

app.get(/.*/, async (req, res, next) => {
    if (/\.(?:js|css|map|png|jpg|jpeg|gif|webp|svg|ico|txt|woff2?|ttf)$/i.test(req.path)) {
        console.log('req.path', req.path)
        return next();
    }
    
    const url = req.originalUrl
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base: baseUrl
    })
    app.use(vite.middlewares)

    try { 
        const originTemplate = fs.readFileSync(path.join(distPath+'/frontend/prerenderIndex.html'), 'utf8');
        const transformedTemplate = await vite.transformIndexHtml(url, originTemplate)
        const App = await (await import(distPath+ '/server/entry-prerender-hydrate.js')).render()
        const reactHtml = renderToString(App);
        // const withDoctype = '<!doctype html>\n' + reactHtml
        const html = transformedTemplate.replace('<div id="root" style="background-color: red; width: 100%; height: calc(100vh);"></div>', `<div id="root" style="background-color: red; width: 100%; height: calc(100vh);">${reactHtml}</div>`);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    } catch (error) {
        console.error('Error', error)
        res.status(500).set({ 'Content-Type': 'text/html; charset=utf-8' }).end('Error');
    }
});

app.use('/assets', express.static(path.join(distPath, 'assets'), { dotfiles: 'allow' }))

app.use(/.*\.(svg|png|jpg|jpeg|gif|webp|js|css)$/, express.static(distPath, { dotfiles: 'allow' }))

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// 타임아웃 설정 (ms)
server.setTimeout(5000);