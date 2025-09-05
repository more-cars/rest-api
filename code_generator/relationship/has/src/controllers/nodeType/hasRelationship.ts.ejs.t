---
to: src/controllers/<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/has<%= h.changeCase.pascal(relationshipName) %>Relation.ts
---
import express from "express"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {marshal<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function has<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)
    const <%= h.changeCase.camel(endNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(endNodeType) %>Id)

    try {
        const relationship = await <%= h.changeCase.pascal(startNodeType) %>.has<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        const marshalledData = marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship)
        sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            sendResponse404(res)
        } else {
            console.error(e)
            sendResponse500(res)
        }
    }
}
