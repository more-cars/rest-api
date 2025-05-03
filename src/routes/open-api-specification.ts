import express from "express"

export async function openApiSpec(req: express.Request, res: express.Response) {
    const apiSpec = require('../../specification/OpenAPI/more-cars.openapi.json')
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(apiSpec)
}
