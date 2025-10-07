---
to: src/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>} from "../../models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>"
import {extractCollectionConstraintParameters} from "../nodes/extractCollectionConstraintParameters"
import availableProperties from "../../../specification/properties/<%= h.changeCase.pascal(nodeType) %>.json"
import {InvalidPaginationParams} from "../../models/types/InvalidPaginationParams"
import {InvalidSortingParams} from "../../models/types/InvalidSortingParams"
import {InvalidFilterParams} from "../../models/types/InvalidFilterParams"
import {marshalAll} from "./marshalAll"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAll(req: express.Request, res: express.Response) {
    try {
        const params = extractCollectionConstraintParameters(req, availableProperties)
        const nodes = await <%= h.changeCase.pascal(nodeType) %>.findAll(params)
        const marshalledData = marshalAll(nodes)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof InvalidPaginationParams || e instanceof InvalidSortingParams || e instanceof InvalidFilterParams) {
            console.error(e)
            return sendResponse400(res)
        }

        console.error(e)
        return sendResponse500(res)
    }
}
