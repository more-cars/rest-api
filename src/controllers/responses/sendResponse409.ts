import express from "express"

export function sendResponse409(res: express.Response) {
    res.status(409)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'no-store')
    res.send({
        errors: [
            {
                status: '409',
                title: 'Node already exists',
                detail: 'There already exists a node with this data in the database.',
            },
        ],
    })
}
