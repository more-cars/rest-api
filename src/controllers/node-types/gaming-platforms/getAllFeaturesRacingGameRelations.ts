import express from "express"
import {GamingPlatform} from "../../../models/node-types/gaming-platforms/GamingPlatform"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllFeaturesRacingGameRelations(req: express.Request, res: express.Response) {
    const gamingPlatformId = parseInt(req.params.gamingPlatformId)

    try {
        const relations = await GamingPlatform.getAllFeaturesRacingGameRelationships(gamingPlatformId)
        const marshalledData = marshalRelations(relations, ControllerNodeType.RacingGame)

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
