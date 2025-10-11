---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation.ts
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

export async function getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)
    const <%= h.changeCase.camel(endNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(endNodeType) %>Id)

    try {
        const relationship = await <%= h.changeCase.pascal(startNodeType) %>.getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        const relationshipPartner = await Image.findById(relationship.<%= h.changeCase.camel(endNodeType) %>Id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as <%= h.changeCase.pascal(endNodeType) %>Node, '<%= h.changeCase.kebab(endNodeType) %>')

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
