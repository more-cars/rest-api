import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {CarModelHasImageResponse} from "./types/CarModelHasImageResponse"

export async function getHasImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.getRelationshipForHasImage(carModelId, imageId)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledRelationship = marshalHasImageRelationship(relationship)

        send200response(marshalledRelationship, res)
    } catch (e) {
        console.error(e)
        send404response(res)
    }
}

function send200response(data: CarModelHasImageResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Did you provide a valid "Car Model" ID?')
}
