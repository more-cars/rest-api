import express from "express"
import {unmarshal} from "./unmarshal"
import {marshal} from "./marshal"
import {CreateBrandInput} from "../../models/brands/types/CreateBrandInput"
import {Brand} from "../../models/brands/Brand"
import {BrandNode} from "../../models/brands/types/BrandNode"
import {sendResponse201} from "../responses/sendResponse201"
import {sendResponse400} from "../responses/sendResponse400"
import {sendResponse500} from "../responses/sendResponse500"
import {CreateBrandRawInput} from "./types/CreateBrandRawInput"
import {isMandatoryString} from "../validators/isMandatoryString"
import {isOptionalString} from "../validators/isOptionalString"
import {isOptionalNumber} from "../validators/isOptionalNumber"

export async function create(req: express.Request, res: express.Response) {
    const data = unmarshal(req.body)

    if (!validate(data)) {
        return sendResponse400(res)
    }

    const sanitizedData = sanitize(data as CreateBrandInput)

    try {
        const createdNode: BrandNode = await Brand.create(sanitizedData)
        const marshalledData = marshal(createdNode)
        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateBrandRawInput): boolean {
    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalString(data.full_name)) {
        return false
    }

    if (!isOptionalNumber(data.founded)) {
        return false
    }

    if (!isOptionalNumber(data.defunct)) {
        return false
    }

    if (!isOptionalString(data.wmi)) {
        return false
    }

    if (!isOptionalString(data.hsn)) {
        return false
    }

    return true
}

export function sanitize(data: CreateBrandInput): CreateBrandInput {
    return {
        name: data.name.trim(),
        full_name: data.full_name ? data.full_name.trim() : null,
        founded: data.founded ? data.founded : null,
        defunct: data.defunct ? data.defunct : null,
        wmi: data.wmi ? data.wmi.trim() : null,
        hsn: data.hsn ? data.hsn.trim() : null,
    } as CreateBrandInput
}
