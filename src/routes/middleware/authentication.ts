import express from "express"
import {sendResponse401} from "../../controllers/responses/sendResponse401"

export function authentication(req: express.Request, res: express.Response, next: express.NextFunction) {
    const accessToken = process.env.API_ACCESS_TOKEN as string

    if (!accessToken) {
        return next()
    }

    if (['POST', 'DELETE'].includes(req.method)) {
        const authHeader = req.headers.authorization
        if (!req.headers.authorization) {
            return sendResponse401(res, next)
        }

        const authParts = authHeader?.split(' ')
        if (!authParts || authParts.length !== 2 || authParts[0] !== 'Bearer') {
            return sendResponse401(res, next)
        }

        const providedToken = authParts[1]

        if (providedToken !== accessToken) {
            return sendResponse401(res, next)
        }

        return next()
    }

    return next()
}
