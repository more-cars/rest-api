import express from "express"
import {LapTime} from "../../../models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createDocumentedInMagazineIssueRelation(req: express.Request, res: express.Response) {
    const lapTimeId = parseInt(req.params.lapTimeId)
    const magazineIssueId = parseInt(req.body?.data?.id)

    try {
        await LapTime.createDocumentedInMagazineIssueRelationship(lapTimeId, magazineIssueId)
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
