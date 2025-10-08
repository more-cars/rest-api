import express from "express"
import {unmarshal} from "./unmarshal"
import {marshalNode} from "./marshalling/marshalNode"
import {CreateCompanyInput} from "../../models/companies/types/CreateCompanyInput"
import {CompanyNode} from "../../models/companies/types/CompanyNode"
import {Company} from "../../models/companies/Company"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"
import {CreateCompanyRawInput} from "./types/CreateCompanyRawInput"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {isOptionalNumber} from "../validators/isOptionalNumber"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshal(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateCompanyInput)

    try {
        const createdNode: CompanyNode = await Company.create(sanitizedData)
        const marshalledData = marshalNode(createdNode)
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
    } as CreateCompanyInput
}
