import express from "express"

export function sendResponse204(res: express.Response) {
    res.status(204)
    res.set('Cache-Control', 'no-cache')
    res.set('Strict-Transport-Security', "max-age=63072000")
    res.send()
}
