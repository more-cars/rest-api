---
to: src/controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller.ts
---
import express from "express"
import {createNode} from "./<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/createNode"

export const <%= h.changeCase.pascal(nodeType) %>Controller = {
    async create(req: express.Request, res: express.Response) {
        await createNode(req, res)
    },
}
