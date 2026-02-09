import express from "express"
import {health} from "./health/health"

export const HealthController = {
    async health(req: express.Request, res: express.Response) {
        await health(req, res)
    },
}
