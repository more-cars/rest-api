import express from "express"

export function sendResponse404(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Resource not found.')
}
