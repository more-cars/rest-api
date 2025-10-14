import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import type {CarModelNode} from "../../models/car-models/types/CarModelNode"
import type {BaseRelationship} from "../relationships/types/BaseRelationship"
import {marshalRelationship} from "../relationships/marshalRelationship"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../models/types/RelationshipAlreadyExistsError"
import {SemanticError} from "../../models/types/SemanticError"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse304} from "../responses/sendResponse304"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse422} from "../responses/sendResponse422"
import {sendResponse500} from "../responses/sendResponse500"

export async function createHasSuccessorRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const relationPartnerId = parseInt(req.params.relationPartnerId)

    try {
        const relation = await CarModel.createHasSuccessorRelationship(carModelId, relationPartnerId)
        const relationPartner = await CarModel.findById(relationPartnerId)
        const marshalledData = marshalRelationship(relation as BaseRelationship, relationPartner as CarModelNode, 'car model')

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
