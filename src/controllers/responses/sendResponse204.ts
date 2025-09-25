import express from "express"

export function sendResponse204(res: express.Response) {
    res.status(204)
    res.send()
}
