import express from "express"

export function sendResponse304(res: express.Response) {
    res.status(304)
    res.send()
}
