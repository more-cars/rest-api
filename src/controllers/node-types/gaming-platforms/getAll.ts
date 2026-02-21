import express from "express"
import {extractCollectionConstraintParameters} from "../../nodes/extractCollectionConstraintParameters"
import availableProperties from "../../../../specification/properties/GamingPlatform.json"
import {GamingPlatform} from "../../../models/node-types/gaming-platforms/GamingPlatform"
import {convertGamingPlatformNodeToControllerNode} from "./convertGamingPlatformNodeToControllerNode"
import {marshalNodeCollection} from "../../nodes/marshalNodeCollection"
import {InvalidPaginationParams} from "../../../models/types/InvalidPaginationParams"
import {InvalidSortingParams} from "../../../models/types/InvalidSortingParams"
import {InvalidFilterParams} from "../../../models/types/InvalidFilterParams"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAll(req: express.Request, res: express.Response) {
    try {
        const params = extractCollectionConstraintParameters(req, availableProperties)
        const modelNodes = await GamingPlatform.findAll(params)
        const nodes = modelNodes.map(node => convertGamingPlatformNodeToControllerNode(node))
        const marshalledData = marshalNodeCollection(nodes)

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
