import express from "express"

export function sendResponse404(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60, stale-if-error=600')
    res.send({
        errors: [
            {
                status: '404',
                title: 'Node not found',
                detail: `The request contains a reference to a node that does not exist, does not exist anymore, or is temporarily unavailable.`,
            },
        ],
    })
}
