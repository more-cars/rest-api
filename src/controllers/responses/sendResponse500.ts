import express from "express"

export function sendResponse500(res: express.Response) {
    res.status(500)
    res.set('Content-Type', 'text/plain')
    res.set('Cache-Control', 'public, max-age=0, stale-if-error=600')
    res.send('Request failed.')
}
