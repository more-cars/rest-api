import express from "express"

export function sendResponse409(res: express.Response) {
    res.status(409)
    res.set('Content-Type', 'text/plain')
    res.set('Cache-Control', 'no-store')
    res.send('Request failed. The provided data already exists in the database.')
}
