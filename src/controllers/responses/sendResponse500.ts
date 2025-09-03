import express from "express"

export function sendResponse500(res: express.Response) {
    res.status(500)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed.')
}
