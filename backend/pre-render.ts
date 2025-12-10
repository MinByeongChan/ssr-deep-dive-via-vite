import express from 'express';
import { createServer as createViteServer } from 'vite'

export const preRenderApp = async (app: express.Application) => {
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    app.use(vite.middlewares)
    return vite
}