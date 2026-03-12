import express from "express"
import {ProgrammeEpisode} from "../../../models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../models/types/RelNotFoundError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function deleteFollowsEpisodeRelation(req: express.Request, res: express.Response) {
    const programmeEpisodeId = parseInt(req.params.programmeEpisodeId)
    const partnerId = parseInt(req.params.partnerId)

    try {
        await ProgrammeEpisode.deleteFollowsEpisodeRelationship(programmeEpisodeId, partnerId)

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
