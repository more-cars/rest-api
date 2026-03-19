import express from "express"

export function sendResponse201(data: unknown, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.set('Cache-Control', 'no-store')
    res.send(data)
}
