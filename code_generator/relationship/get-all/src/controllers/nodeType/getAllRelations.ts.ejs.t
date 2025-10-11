---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/getAll<%= h.changeCase.pascal(relationshipName) %>Relations.ts
---
import express from "express"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(endNodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/<%= h.changeCase.pascal(endNodeType) %>"
import type {<%= h.changeCase.pascal(endNodeType) %>Node} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/types/<%= h.changeCase.pascal(endNodeType) %>Node"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationships} from "../relationships/marshalRelationships"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAll<%= h.changeCase.pascal(relationshipName) %>Relations(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)

    try {
        const relationships = await <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>Id)
        for (const relationship of relationships) {
            relationship.relationship_partner = await <%= h.changeCase.pascal(endNodeType) %>.findById(relationship.<%= h.changeCase.snake(startNodeType) %>_id) as <%= h.changeCase.pascal(endNodeType) %>Node
        }
        const marshalledData = marshalRelationships(relationships as BaseRelationship[], "<%= h.changeCase.kebab(startNodeType) %>")

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
