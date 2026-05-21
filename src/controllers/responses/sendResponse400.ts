import express from "express"

export function sendResponse400(res: express.Response) {
    res.status(400)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'no-store')
    res.send({
        errors: [
            {
                status: '400',
                title: 'Invalid Request',
                detail: 'The request contains invalid data, like a syntax error or malformed data.',
            },
        ],
    })
}
