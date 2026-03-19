import express from "express"

export function sendResponse404(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60, stale-if-error=600')
    res.send('Resource not found.')
}
