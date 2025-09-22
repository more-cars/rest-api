import express from "express"

export function sendResponse204(res: express.Response) {
    res.status(204)
    res.set('Content-Type', 'application/json')
    res.send()
}
