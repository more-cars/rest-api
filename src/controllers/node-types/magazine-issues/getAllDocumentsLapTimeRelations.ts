import express from "express"
import {MagazineIssue} from "../../../models/node-types/magazine-issues/MagazineIssue"
import {convertModelRelationToControllerRelation} from "../../relations/convertModelRelationToControllerRelation"
import {marshalRelations} from "../../relations/marshalRelations"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {sendResponse200} from "../../responses/sendResponse200"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function getAllDocumentsLapTimeRelations(req: express.Request, res: express.Response) {
    const magazineIssueId = parseInt(req.params.magazineIssueId)

    try {
        const modelRelations = await MagazineIssue.getAllDocumentsLapTimeRelationships(magazineIssueId)
        const relations = modelRelations.map(relation => convertModelRelationToControllerRelation(relation))
        const marshalledData = marshalRelations(relations)

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
