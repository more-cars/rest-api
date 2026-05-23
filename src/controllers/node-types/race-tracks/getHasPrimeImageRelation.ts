import express from "express"
import {RaceTrack} from "../../../models/node-types/race-tracks/RaceTrack"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalSingleRelation} from "../../relations/marshalSingleRelation"
import {marshalEmptyRelation} from "../../relations/marshalEmptyRelation"
import {ControllerNodeType} from "../../types/ControllerNodeType"
import {RelationType} from "../../types/RelationType"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const raceTrackId = parseInt(req.params.raceTrackId)

    try {
        const modelRelation = await RaceTrack.getHasPrimeImageRelationship(raceTrackId)
        const relation = convertModelRelationToControllerRelation(modelRelation)
        const marshalledData = marshalSingleRelation(relation)

        return sendResponse200(marshalledData, res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelNotFoundError) {
            const marshalledData = marshalEmptyRelation(ControllerNodeType.RaceTrack, raceTrackId, RelationType.RaceTrackHasPrimeImage)
            return sendResponse200(marshalledData, res)
        } else {
            console.error(e)
            return sendResponse500(res)
        }
    }
}
