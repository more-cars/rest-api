import express from "express"
import {trackVisit} from "./trackVisit"

export function analyticsMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!process.env.ANALYTICS_URL) {
        return next()
    }

    trackVisit(req, {
        action: `${req.method} ${req.path}`
    }).catch(() => {
        console.error('Matomo Logging Error')
    })

    next()
}
