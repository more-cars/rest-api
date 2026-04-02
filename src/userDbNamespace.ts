import express from "express"
import crypto from "node:crypto"

export function userDbNamespace(req: express.Request, res: express.Response, next: express.NextFunction) {
    const namespace = req.headers['user-namespace'] as string

    if (process.env.USER_NAMESPACE_ENABLED === 'true' && namespace) {
        process.env.USER_NAMESPACE = crypto.hash('md5', namespace).substring(0, 10)
    } else {
        delete process.env.USER_NAMESPACE
    }

    return next()
}
