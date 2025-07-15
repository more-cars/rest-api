import express from "express"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {CarModel} from "../../models/car-models/CarModel"
import {CarModelHasImageResponse} from "./types/CarModelHasImageResponse"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.createHasImageRelationship(carModelId, imageId)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledData = marshalHasImageRelationship(relationship)

        send201response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send422response(res)
    }
}

function send201response(data: CarModelHasImageResponse, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Node not found.')
}

function send422response(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Relationship could not be created.')
}
