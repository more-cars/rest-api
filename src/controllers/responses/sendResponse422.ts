import express from "express"

export function sendResponse422(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'no-store')
    res.send({
        errors: [
            {
                status: '422',
                title: 'Semantical Error',
                detail: 'Request could not be processed. There is probably a semantical error in the provided data.',
            },
        ],
    })
}
