import express from "express"

import apiSpec from "../../../specification/OpenAPI/more-cars.openapi.json"

export async function openApiSpecification(req: express.Request, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(apiSpec)
}
