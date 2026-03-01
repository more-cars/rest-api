import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateMagazineIssueInput} from "../../../models/node-types/magazine-issues/types/CreateMagazineIssueInput"
import {MagazineIssue} from "../../../models/node-types/magazine-issues/MagazineIssue"
import {convertMagazineIssueModelNodeToControllerNode} from "./convertMagazineIssueModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateMagazineIssueRawInput} from "./types/CreateMagazineIssueRawInput"
import {isMandatoryString} from "../../validators/isMandatoryString"
import {isOptionalString} from "../../validators/isOptionalString"
import {isOptionalNumber} from "../../validators/isOptionalNumber"
import {sendResponse201} from "../../responses/sendResponse201"
import {sendResponse400} from "../../responses/sendResponse400"
import {sendResponse500} from "../../responses/sendResponse500"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshalInputData(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateMagazineIssueInput)

    try {
        const modelNode = await MagazineIssue.create(sanitizedData)
        const node = convertMagazineIssueModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateMagazineIssueRawInput): boolean {

    if (!isMandatoryString(data.title)) {
        return false
    }

    if (!isOptionalNumber(data.consecutive_number)) {
        return false
    }

    if (!isOptionalNumber(data.issue_number)) {
        return false
    }

    if (!isOptionalNumber(data.issue_year)) {
        return false
    }

    if (!isOptionalString(data.release_date)) {
        return false
    }

    if (!isOptionalNumber(data.single_copy_price)) {
        return false
    }

    if (!isOptionalString(data.single_copy_price_unit)) {
        return false
    }

    if (!isOptionalNumber(data.pages)) {
        return false
    }

    return true
}

export function sanitize(data: CreateMagazineIssueInput): CreateMagazineIssueInput {
    return {
        title: data.title.trim(),
        consecutive_number: data.consecutive_number ? data.consecutive_number : null,
        issue_number: data.issue_number ? data.issue_number : null,
        issue_year: data.issue_year ? data.issue_year : null,
        release_date: data.release_date ? data.release_date.trim() : null,
        single_copy_price: data.single_copy_price ? data.single_copy_price : null,
        single_copy_price_unit: data.single_copy_price_unit ? data.single_copy_price_unit.trim() : null,
        pages: data.pages ? data.pages : null,
    } satisfies CreateMagazineIssueInput
}
