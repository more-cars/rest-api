import express from "express"

export function basicAuthentication(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!requiresAuthentication()) {
        return next()
    }

    const authHeader = req.headers.authorization
    if (!authHeader) {
        return send401Response(res, next)
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const providedUsername = auth[0]
    const providedPassword = auth[1]
    const requiredUsername = process.env.BASIC_AUTH_USERNAME
    const requiredPassword = process.env.BASIC_AUTH_PASSWORD

    if (providedUsername !== requiredUsername || providedPassword !== requiredPassword) {
        return send401Response(res, next)
    }

    return next()
}

function requiresAuthentication(): boolean {
    return !!(process.env.BASIC_AUTH_USERNAME && process.env.BASIC_AUTH_PASSWORD)
}

function send401Response(res: express.Response, next: express.NextFunction) {
    const err = new Error('Authentication missing')
    res.setHeader('WWW-Authenticate', 'Basic')
    res.status(401)

    return next(err)
}
