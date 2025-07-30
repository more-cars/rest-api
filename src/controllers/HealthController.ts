import express from "express"
import {health} from "./health/health"

export class HealthController {
    static async health(req: express.Request, res: express.Response) {
        await health(req, res)
    }
}
