import express from "express"

export function sendResponse201(data: unknown, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'no-store')
    res.set('Strict-Transport-Security', "max-age=63072000")
    res.send(data)
}
