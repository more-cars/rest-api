import express from "express"
import {openApiSpecification} from "./apiSpec/openApiSpecification"

export class ApiSpecController {
    static async apiSpec(req: express.Request, res: express.Response) {
        await openApiSpecification(req, res)
    }
}
