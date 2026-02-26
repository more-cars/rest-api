import express from "express"
import {unmarshalInputData} from "./marshalling/unmarshalInputData"
import {CreateMagazineInput} from "../../../models/node-types/magazines/types/CreateMagazineInput"
import {Magazine} from "../../../models/node-types/magazines/Magazine"
import {convertMagazineModelNodeToControllerNode} from "./convertMagazineModelNodeToControllerNode"
import {marshalSingleNode} from "../../nodes/marshalSingleNode"
import type {CreateMagazineRawInput} from "./types/CreateMagazineRawInput"
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

    const sanitizedData = sanitize(data as CreateMagazineInput)

    try {
        const modelNode = await Magazine.create(sanitizedData)
        const node = convertMagazineModelNodeToControllerNode(modelNode)
        const marshalledData = marshalSingleNode(node.fields)

        return sendResponse201(marshalledData, res)
    } catch (e) {
        console.error(e)
        return sendResponse500(res)
    }
}

export function validate(data: CreateMagazineRawInput): boolean {

    if (!isMandatoryString(data.name)) {
        return false
    }

    if (!isOptionalNumber(data.founded)) {
        return false
    }

    if (!isOptionalNumber(data.defunct)) {
        return false
    }

    if (!isOptionalString(data.focus)) {
        return false
    }

    if (!isOptionalString(data.publication_frequency)) {
        return false
    }

    if (!isOptionalNumber(data.single_copy_price)) {
        return false
    }

    if (!isOptionalString(data.single_copy_price_unit)) {
        return false
    }

    if (!isOptionalString(data.publication_format)) {
        return false
    }

    if (!isOptionalNumber(data.circulation)) {
        return false
    }

    if (!isOptionalNumber(data.circulation_year)) {
        return false
    }

    if (!isOptionalString(data.publisher)) {
        return false
    }

    if (!isOptionalString(data.issn)) {
        return false
    }

    return true
}

export function sanitize(data: CreateMagazineInput): CreateMagazineInput {
    return {
        name: data.name.trim(),
        founded: data.founded ? data.founded : null,
        defunct: data.defunct ? data.defunct : null,
        focus: data.focus ? data.focus.trim() : null,
        publication_frequency: data.publication_frequency ? data.publication_frequency.trim() : null,
        single_copy_price: data.single_copy_price ? data.single_copy_price : null,
        single_copy_price_unit: data.single_copy_price_unit ? data.single_copy_price_unit.trim() : null,
        publication_format: data.publication_format ? data.publication_format.trim() : null,
        circulation: data.circulation ? data.circulation : null,
        circulation_year: data.circulation_year ? data.circulation_year : null,
        publisher: data.publisher ? data.publisher.trim() : null,
        issn: data.issn ? data.issn.trim() : null,
    } satisfies CreateMagazineInput
}
