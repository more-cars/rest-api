import express from "express"

export function sendResponse500(res: express.Response) {
    res.status(500)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'public, max-age=0, stale-if-error=600')
    res.send({
        errors: [
            {
                status: '500',
                title: 'Technical Difficulties',
                detail: 'The request failed because of unknown reason. Please try again later.',
            },
        ],
    })
}
