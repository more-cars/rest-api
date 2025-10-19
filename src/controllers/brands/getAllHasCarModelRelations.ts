import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalRelations} from "../relationships/marshalRelations"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllHasCarModelRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relations = await Brand.getAllHasCarModelRelationships(brandId)
        const marshalledData = marshalRelations(relations, "car model")

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
