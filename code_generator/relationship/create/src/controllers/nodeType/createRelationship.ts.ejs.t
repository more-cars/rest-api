---
to: src/controllers/<%= h.inflection.pluralize(h.changeCase.camel(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation.ts
---
import express from "express"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(endNodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/<%= h.changeCase.pascal(endNodeType) %>"
import type {<%= h.changeCase.pascal(startNodeType) %>Node} from "../../models/brands/types/<%= h.changeCase.pascal(startNodeType) %>Node"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function create<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)
    const <%= h.changeCase.camel(endNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(endNodeType) %>Id)

    try {
        const relationship = await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        const relationshipPartner = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(endNodeType) %>Id)
        const marshalledData = marshalRelationship(relationship as BaseRelationship, relationshipPartner as <%= h.changeCase.pascal(startNodeType) %>Node, '<%= h.changeCase.kebab(startNodeType) %>')

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
