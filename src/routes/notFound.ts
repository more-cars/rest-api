import express from "express"

export function notFound(req: express.Request, res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'application/vnd.api+json')
    res.set('Cache-Control', 'public, max-age=30, stale-while-revalidate=60, stale-if-error=600')
    res.send({
        errors: [
            {
                status: '404',
                title: 'Not Found',
                detail: `Route ${req.method} ${req.originalUrl} does not exist`,
            },
        ],
    })
}
