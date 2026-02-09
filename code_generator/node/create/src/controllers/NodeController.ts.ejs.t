---
to: src/controllers/<%= h.changeCase.pascal(nodeType) %>Controller.ts
---
import express from "express"
import {create} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/create"

export const <%= h.changeCase.pascal(nodeType) %>Controller = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
