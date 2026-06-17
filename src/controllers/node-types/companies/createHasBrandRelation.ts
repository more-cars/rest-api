import express from "express"
import {Company} from "../../../models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../models/types/NodeNotFoundError"
import {RelAlreadyExistsError} from "../../../models/types/RelAlreadyExistsError"
import {sendResponse204} from "../../responses/sendResponse204"
import {sendResponse304} from "../../responses/sendResponse304"
import {sendResponse404} from "../../responses/sendResponse404"
import {sendResponse500} from "../../responses/sendResponse500"

export async function createHasBrandRelation(req: express.Request, res: express.Response) {
    const companyId = parseInt(req.params.companyId)
    const brandId = parseInt(req.body?.data?.id)

    try {
        await Company.createHasBrandRelationship(companyId, brandId)
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
