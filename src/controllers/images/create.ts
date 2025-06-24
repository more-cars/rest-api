import express from "express"
import {unmarshal} from "./unmarshal"
import {CreateImageInput} from "../../models/images/types/CreateImageInput"
import {ImageResponse} from "./types/ImageResponse"
import {marshal} from "./marshal"
import {CreateImageRawInput} from "./types/CreateImageRawInput"
import {Image} from "../../models/images/Image"
import {ImageNode} from "../../models/images/types/ImageNode"

export async function create(req: express.Request, res: express.Response) {
    try {
        const data = unmarshal(req.body)

        if (!validate(data)) {
            return send400response(res)
        }

        const sanitizedData = sanitize(data as CreateImageInput)
        const createdNode: ImageNode = await Image.create(sanitizedData)
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
export function validate(data: CreateImageRawInput): boolean {
    if (!data.external_id || typeof data.external_id !== "string") {
        return false
    }

    if (!data.image_provider || typeof data.image_provider !== "string") {
        return false
    }

    return true
}

export function sanitize(data: CreateImageInput): CreateImageInput {
    const sanitizedData: CreateImageInput = {
        external_id: data.external_id.trim(),
        image_provider: data.image_provider.trim(),
    }

    return sanitizedData
}

function send201response(data: ImageResponse, res: express.Response) {
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
