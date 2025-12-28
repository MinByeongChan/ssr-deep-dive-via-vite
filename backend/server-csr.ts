import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

const __dirname = path.resolve();
const distPath = path.join(__dirname, 'dist');

// static files accessible
app.use('/assets', express.static(distPath+'/client/assets', { dotfiles: 'allow' }))
app.get(/.*/, async (_req: express.Request, res: express.Response) => {
    try { 
        const template = fs.readFileSync(path.join(distPath, '/client/index.html'), 'utf8');
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(template);
        
    } catch (error) {
        console.error('Error', error)
        res.status(500).set({ 'Content-Type': 'text/html; charset=utf-8' }).end('Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});