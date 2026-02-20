import express from "express"
import {Relationship} from "../../models/Relationship"
import {marshalRelation} from "./marshalRelation"
import {ControllerNodeType} from "../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../models/types/RelNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getById(req: express.Request, res: express.Response) {
    const relationId = parseInt(req.params.id)

    try {
        const relation = await Relationship.findById(relationId)
        const marshalledData = marshalRelation(relation, ControllerNodeType.BRAND) // TODO provide correct partner node type

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            return sendResponse404(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
