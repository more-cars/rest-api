import express from "express"

export function sendResponse200(data: unknown, res: express.Response) {
    res.set('Content-Type', 'application/json')
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300, stale-if-error=600')
    res.send(data)
}
