import express from "express"

export function sendResponse200(data: any, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}
