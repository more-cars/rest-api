import express from "express"
import {unmarshal} from "./unmarshal"
import {Brand} from "../../models/brands/Brand"
import {CreateBrandInput} from "../../models/brands/types/CreateBrandInput"
import {BrandNode} from "../../models/brands/types/BrandNode"
import {BrandResponse} from "./types/BrandResponse"
import {marshal} from "./marshal"
import {CreateBrandRawInput} from "./types/CreateBrandRawInput"

export async function create(req: express.Request, res: express.Response) {
    try {
        const data = unmarshal(req.body)

        if (!validate(data)) {
            return send400response(res)
        }

        const sanitizedData = sanitize(data as CreateBrandInput)
        const createdNode: BrandNode = await Brand.create(sanitizedData)
        const marshalledData = marshal(createdNode)

        send201response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send422response(res)
    }
}

/**
 * Syntactical and structural checks.
 * Checking that all mandatory fields are set.
 * Checking that all fields have the correct data type.
 */
export function validate(data: CreateBrandRawInput): boolean {
    if (!data.name || typeof data.name !== "string") {
        return false
    }

    if (data.full_name && typeof data.full_name !== "string") {
        return false
    }

    if (data.founded && typeof data.founded !== "number") {
        return false
    }

    if (data.defunct && typeof data.defunct !== "number") {
        return false
    }

    if (data.wmi && typeof data.wmi !== "string") {
        return false
    }

    if (data.hsn && typeof data.hsn !== "string") {
        return false
    }

    return true
}

export function sanitize(data: CreateBrandInput): CreateBrandInput {
    const sanitizedData: CreateBrandInput = {
        name: data.name.trim(),
        full_name: data.full_name ? data.full_name.trim() : null,
        founded: data.founded ? data.founded : null,
        defunct: data.defunct ? data.defunct : null,
        wmi: data.wmi ? data.wmi.trim() : null,
        hsn: data.hsn ? data.hsn.trim() : null,
    }

    return sanitizedData
}

function send201response(data: BrandResponse, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send400response(res: express.Response) {
    res.status(400)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Input data invalid.')
}

function send422response(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Node could not be created.')
}
