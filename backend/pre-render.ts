import express from 'express';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { createServer  } from 'vite'

const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

// static files accessible
app.use('/assets', express.static(distPath+'/assets', { dotfiles: 'allow' }))
app.use(/.*\.(svg|png|jpg|jpeg|gif|webp)$/, express.static(distPath, { dotfiles: 'allow' }))
const baseUrl = process.env.BASE || '/'

app.get(/.*/, async (req: express.Request, res: express.Response) => {
    const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'custom',
        base: baseUrl
    })

    app.use(vite.middlewares)

    try { 
        // Static Site Generation
        const App = await (await import(distPath+ '/server/entry-server-prerender.js')).render()
        const reactHtml = renderToString(App);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(reactHtml);
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