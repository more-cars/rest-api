import express from "express"

export function sendResponse400(res: express.Response) {
    res.status(400)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Provided data was invalid or malformed.')
}
