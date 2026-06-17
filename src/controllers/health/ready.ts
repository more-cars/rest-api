import express from "express"
import {getDriver} from "../../db/driver"

export async function ready(req: express.Request, res: express.Response) {
    res.set('Content-Type', 'text/plain')
    res.set('Cache-Control', 'no-cache')

    try {
        const driver = getDriver()
        await driver.verifyConnectivity()
        res.status(200)
        res.send("ready")
    } catch {
        res.status(503)
        res.send("not ready")
    }
}
