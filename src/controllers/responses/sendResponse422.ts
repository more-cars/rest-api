import express from "express"

export function sendResponse422(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. The provided data might be semantically incorrect.')
}
