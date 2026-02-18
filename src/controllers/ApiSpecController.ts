import express from "express"
import {openApiSpecification} from "./api-spec/openApiSpecification"

export const ApiSpecController = {
    async apiSpec(req: express.Request, res: express.Response) {
        await openApiSpecification(req, res)
    },
}
