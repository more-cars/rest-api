import express from "express"
import {RacingGame} from "../../../models/node-types/racing-games/RacingGame"
import {marshalRelation} from "../../relations/marshalRelation"
import {ControllerNodeType} from "../../nodes/types/ControllerNodeType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"

import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createFeaturesTrackLayoutRelation(req: express.Request, res: express.Response) {
    const racingGameId = parseInt(req.params.racingGameId)
    const trackLayoutId = parseInt(req.params.trackLayoutId)

    try {
        const relation = await RacingGame.createFeaturesTrackLayoutRelationship(racingGameId, trackLayoutId)
        const marshalledData = marshalRelation(relation, ControllerNodeType.TRACK_LAYOUT)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
