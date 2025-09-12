import express from "express"

export function sendResponse401(res: express.Response, next: express.NextFunction) {
    res.status(401)
    res.setHeader('WWW-Authenticate', 'Basic')
    res.send('Request failed. Authentication information is missing.')

    return next(new Error('Authentication missing'))
}
