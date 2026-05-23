import express from "express"
import {RacingGame} from "../../../models/node-types/racing-games/RacingGame"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllFeaturesCarModelVariantRelations(req: express.Request, res: express.Response) {
    const racingGameId = parseInt(req.params.racingGameId)

    try {
        const modelRelations = await RacingGame.getAllFeaturesCarModelVariantRelationships(racingGameId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations, ControllerNodeType.RacingGame, racingGameId, RelationType.RacingGameFeaturesCarModelVariant)

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
