import express from "express"
import {ProgrammeEpisode} from "../../../models/node-types/programme-episodes/ProgrammeEpisode"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasMainVideoRelation(req: express.Request, res: express.Response) {
    const programmeEpisodeId = parseInt(req.params.programmeEpisodeId)
    const videoId = parseInt(req.body?.data?.id)

    try {
        await ProgrammeEpisode.createHasMainVideoRelationship(programmeEpisodeId, videoId)
        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            return sendResponse500(res)
        }
    }
}
