---
to: src/controllers/<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation.ts
---
import express from "express"
import {marshal<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response} from "./types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response"

export async function create<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)
    const <%= h.changeCase.camel(endNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(endNodeType) %>Id)

    try {
        const relationship = await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledData = marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship)

        send201response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send500response(res)
    }
}

function send201response(data: <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Response, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Node not found.')
}

function send500response(res: express.Response) {
    res.status(500)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Relationship could not be created.')
}
