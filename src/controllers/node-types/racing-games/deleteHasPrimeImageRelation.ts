import express from "express"
import {RacingGame} from "../../../models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const racingGameId = parseInt(req.params.racingGameId)
    const imageId = parseInt(req.params.imageId)

    try {
        await RacingGame.deleteHasPrimeImageRelationship(racingGameId, imageId)

        return sendResponse204(res)
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
