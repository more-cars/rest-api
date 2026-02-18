import express from "express"
import {GamingPlatform} from "../../../models/gaming-platforms/GamingPlatform"
import {marshalRelation} from "../../relationships/marshalRelation"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../models/types/RelationshipAlreadyExistsError"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createFeaturesRacingGameRelation(req: express.Request, res: express.Response) {
    const gamingPlatformId = parseInt(req.params.gamingPlatformId)
    const racingGameId = parseInt(req.params.racingGameId)

    try {
        const relation = await GamingPlatform.createFeaturesRacingGameRelationship(gamingPlatformId, racingGameId)
        const marshalledData = marshalRelation(relation, NodeTypeEnum.RACING_GAME)

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
