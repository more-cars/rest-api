import express from "express"

export function sendResponse304(res: express.Response) {
    res.status(304)
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300, stale-if-error=600')
    res.set('Strict-Transport-Security', "max-age=63072000")
    res.send()
}
