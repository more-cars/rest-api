import express from "express"

export function sendResponse201(data: unknown, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send(data)
}
