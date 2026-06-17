import express from "express"
import {healthz} from "./health/healthz"
import {ready} from "./health/ready"

export const HealthController = {
    async healthz(req: express.Request, res: express.Response) {
        await healthz(req, res)
    },

    async ready(req: express.Request, res: express.Response) {
        await ready(req, res)
    },
}
