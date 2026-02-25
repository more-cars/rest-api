---
to: src/controllers/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/create<%= h.changeCase.pascal(relationshipName) %>Relation.ts
---
import express from "express"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelation} from "../../relations/marshalRelation"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
<% if (startNodeType === endNodeType) { %>
import {SemanticError} from "../../../models/types/SemanticError"
import {sendResponse422} from "../../responses/sendResponse422"
<% } %>
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
    const <%= h.changeCase.camel(startNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType) %>Id)
    const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id = parseInt(req.params.<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)

    try {
        const modelRelation = await <%= h.changeCase.pascal(startNodeType) %>.create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalRelation(relation)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
<% if (startNodeType === endNodeType) { -%>
        } else if (e instanceof SemanticError) {
            return sendResponse422(res)
<% } -%>
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
