import express from 'express';
import path from 'path';
import fs from 'fs';
import { preRenderApp } from './pre-render';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

// static files accessible
app.use('/assets', express.static('dist/assets', { dotfiles: 'allow' }))

app.get(/.*/, async (req: express.Request, res: express.Response) => {
    const url = req.originalUrl

    try { 
        const vite = await preRenderApp(app);
    
        // Client Side Rendering
        // const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
        // res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(template);
        
        // Server Side Rendering
        let template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(template);
        template = await vite.transformIndexHtml(url, template)
        const {default: App} =  await vite.ssrLoadModule('/src/App.tsx')
        const reactHtml = renderToString(React.createElement(App, { ssrPath: path }));
        const html = template.replace('<!--ssr-outlet-->', () => reactHtml);

        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
    } catch (error) {
        console.error('Error', error)
        res.status(500).set({ 'Content-Type': 'text/html; charset=utf-8' }).end('Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});