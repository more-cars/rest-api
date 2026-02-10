import express from "express"
import {RacingGame} from "../../models/racing-games/RacingGame"
import {marshalRelations} from "../relationships/marshalRelations"
import {NodeTypeEnum} from "../nodes/types/NodeTypeEnum"
import {NodeNotFoundError} from "../../models/types/NodeNotFoundError"
import {sendResponse200} from "../responses/sendResponse200"
import {sendResponse404} from "../responses/sendResponse404"
import {sendResponse500} from "../responses/sendResponse500"

export async function getAllFeaturesCarModelVariantRelations(req: express.Request, res: express.Response) {
    const racingGameId = parseInt(req.params.racingGameId)

    try {
        const relations = await RacingGame.getAllFeaturesCarModelVariantRelationships(racingGameId)
        const marshalledData = marshalRelations(relations, NodeTypeEnum.CAR_MODEL_VARIANT)

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
