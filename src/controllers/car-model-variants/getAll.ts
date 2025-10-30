import express from "express"
import {CarModelVariant} from "../../models/car-model-variants/CarModelVariant"
import {extractCollectionConstraintParameters} from "../nodes/extractCollectionConstraintParameters"
import availableProperties from "../../../specification/properties/CarModelVariant.json"
import {InvalidPaginationParams} from "../../models/types/InvalidPaginationParams"
import {InvalidSortingParams} from "../../models/types/InvalidSortingParams"
import {InvalidFilterParams} from "../../models/types/InvalidFilterParams"
import {marshalNodes} from "./marshalling/marshalNodes"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAll(req: express.Request, res: express.Response) {
    try {
        const params = extractCollectionConstraintParameters(req, availableProperties)
        const nodes = await CarModelVariant.findAll(params)
        const marshalledData = marshalNodes(nodes)

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
