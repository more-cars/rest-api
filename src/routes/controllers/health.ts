import express from "express"

export async function health(req: express.Request, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'text/plain')
    res.send("healthy")
}
