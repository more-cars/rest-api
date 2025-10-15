---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/get<%= h.changeCase.pascal(relationshipName) %>Relation.ts
---
import express from "express"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(endNodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/<%= h.changeCase.pascal(endNodeType) %>"
import type {<%= h.changeCase.pascal(endNodeType) %>Node} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/types/<%= h.changeCase.pascal(endNodeType) %>Node"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../models/types/RelationshipNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function get<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)

    try {
        const relation = await <%= h.changeCase.pascal(startNodeType) %>.get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id)
        const relationPartner = await <%= h.changeCase.pascal(endNodeType) %>.findById(relation.<%= h.changeCase.snake(endNodeType) %>_id)
        const marshalledData = marshalRelationship(relation as BaseRelationship, relationPartner as <%= h.changeCase.pascal(endNodeType) %>Node, '<%= h.changeCase.lower(endNodeType) %>')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse200(null, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
