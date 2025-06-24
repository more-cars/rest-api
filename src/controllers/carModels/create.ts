import express from "express"
import {unmarshal} from "./unmarshal"
import {CreateCarModelInput} from "../../models/car-models/types/CreateCarModelInput"
import {CarModelResponse} from "./types/CarModelResponse"
import {marshal} from "./marshal"
import {CreateCarModelRawInput} from "./types/CreateCarModelRawInput"
import {CarModel} from "../../models/car-models/CarModel"
import {CarModelNode} from "../../models/car-models/types/CarModelNode"

export async function create(req: express.Request, res: express.Response) {
    try {
        const data = unmarshal(req.body)

        if (!validate(data)) {
            return send400response(res)
        }

        const sanitizedData = sanitize(data as CreateCarModelInput)
        const createdNode: CarModelNode = await CarModel.create(sanitizedData)
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
export function validate(data: CreateCarModelRawInput): boolean {
    if (!data.name || typeof data.name !== "string") {
        return false
    }

    if (data.built_from && typeof data.built_from !== "number") {
        return false
    }

    if (data.built_to && typeof data.built_to !== "number") {
        return false
    }

    if (data.generation && typeof data.generation !== "number") {
        return false
    }

    if (data.internal_code && typeof data.internal_code !== "string") {
        return false
    }

    if (data.total_production && typeof data.total_production !== "number") {
        return false
    }

    return true
}

export function sanitize(data: CreateCarModelInput): CreateCarModelInput {
    const sanitizedData: CreateCarModelInput = {
        name: data.name.trim(),
        built_from: data.built_from ? data.built_from : null,
        built_to: data.built_to ? data.built_to : null,
        generation: data.generation ? data.generation : null,
        internal_code: data.internal_code ? data.internal_code.trim() : null,
        total_production: data.total_production ? data.total_production : null,
    }
    return sanitizedData
}

function send201response(data: CarModelResponse, res: express.Response) {
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
