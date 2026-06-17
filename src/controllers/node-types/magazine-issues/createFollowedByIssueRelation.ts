import express from "express"
import {MagazineIssue} from "../../../models/node-types/magazine-issues/MagazineIssue"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {SemanticError} from "../../../models/types/SemanticError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse422} from "../../responses/sendResponse422"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createFollowedByIssueRelation(req: express.Request, res: express.Response) {
    const magazineIssueId = parseInt(req.params.magazineIssueId)
    const partnerId = parseInt(req.body?.data?.id)

    try {
        await MagazineIssue.createFollowedByIssueRelationship(magazineIssueId, partnerId)
        return sendResponse204(res)
    } catch (e) {
        if (e instanceof NodeNotFoundError) {
            return sendResponse404(res)
        } else if (e instanceof SemanticError) {
            return sendResponse422(res)
        } else if (e instanceof RelAlreadyExistsError) {
            return sendResponse304(res)
        } else {
            return sendResponse500(res)
        }
    }
}
