import express from "express"

export function sendResponse401(res: express.Response, next: express.NextFunction) {
    res.status(401)
    res.setHeader('WWW-Authenticate', 'Basic')
    res.send('Request failed. Provided data was invalid or malformed.')

    return next(new Error('Authentication missing'))
}
