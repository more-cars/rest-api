import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {SemanticError} from "../../models/types/SemanticError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"
import {sendResponse500} from "../responses/sendResponse500"
import {marshalRelation} from "../relationships/marshalRelation"

export async function createHasSuccessorRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const relationPartnerId = parseInt(req.params.relationPartnerId)

    try {
        const relation = await CarModel.createHasSuccessorRelationship(carModelId, relationPartnerId)
        const marshalledData = marshalRelation(relation, 'car model')

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof SemanticError) {
            return sendResponse422(res)
        } else if (e instanceof RelationshipAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
