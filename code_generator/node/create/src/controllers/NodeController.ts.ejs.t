---
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
---
import express from "express"
import {create} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create"

export class <%= h.changeCase.pascal(nodeType) %>Controller {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
