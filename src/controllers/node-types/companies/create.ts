import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateCompanyInput} from "../../../models/node-types/companies/types/CreateCompanyInput"
import {Company} from "../../../models/node-types/companies/Company"
import {convertCompanyModelNodeToControllerNode} from "./convertCompanyModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateCompanyRawInput} from "./types/CreateCompanyRawInput"
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

    const sanitizedData = sanitize(data as CreateCompanyInput)

    try {
        const modelNode = await Company.create(sanitizedData)
        const node = convertCompanyModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateCompanyRawInput): boolean {
    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.founded)) {
        return false
    }

    if (!isOptionalNumber(data.defunct)) {
        return false
    }

    if (!isOptionalString(data.headquarters_location)) {
        return false
    }

    if (!isOptionalString(data.legal_headquarters_location)) {
        return false
    }

    return true
}

export function sanitize(data: CreateCompanyInput): CreateCompanyInput {
    return {
        name: data.name.trim(),
        founded: data.founded ? data.founded : null,
        defunct: data.defunct ? data.defunct : null,
        headquarters_location: data.headquarters_location ? data.headquarters_location.trim() : null,
        legal_headquarters_location: data.legal_headquarters_location ? data.legal_headquarters_location.trim() : null,
    } satisfies CreateCompanyInput
}
