import express from 'express';
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import { createServer  } from 'vite'

const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

// static files accessible
app.use('/assets', express.static(distPath+'/client/assets', { dotfiles: 'allow' }))
app.use(/.*\.(svg|png|jpg|jpeg|gif|webp)$/, express.static(distPath+'/client', { dotfiles: 'allow' }))
const baseUrl = process.env.BASE || '/'

app.get(/.*/, async (req: express.Request, res: express.Response) => {
    const url = req.originalUrl
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base: baseUrl
    })

    app.use(vite.middlewares)

    try { 
        // Static Site Generation
        const originTemplate = fs.readFileSync(path.join(distPath+'/client', 'index.html'), 'utf8');
        const transformedTemplate = await vite.transformIndexHtml(url, originTemplate)
        console.log('transformedTemplate', transformedTemplate)
        const App = await (await import(distPath+ '/server/entry-server-prerender.js')).render()
        const reactHtml = renderToString(App);
        console.log('reactHtml', reactHtml)

        const removeScriptTemplate = transformedTemplate.replace('<script type="module" src="/src/main.tsx"></script>', '');
        const html = removeScriptTemplate.replace('<div id="root" style="background-color: red; width: 100%; height: calc(100vh);"></div>', () => reactHtml);
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