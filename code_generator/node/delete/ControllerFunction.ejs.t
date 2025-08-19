---
to: src/controllers/<%= h.inflection.pluralize(h.changeCase.camel(nodetype)) %>/deleteNode.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodetype) %>} from "../../models/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/<%= h.changeCase.pascal(nodetype) %>"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const success = await <%= h.changeCase.pascal(nodetype) %>.delete(nodeId)

    if (!success) {
        return send404response(res)
    }

    send204response(res)
}

function send204response(res: express.Response) {
    res.status(204)
    res.set('Content-Type', 'application/json')
    res.send()
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send(`A "<%= h.changeCase.title(nodetype) %>" with the provided ID could not be found.`)
}
