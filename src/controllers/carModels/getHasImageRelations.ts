import express from "express"
import {marshalHasImageRelationships} from "./marshalling/marshalHasImageRelationships"
import {CarModel} from "../../models/car-models/CarModel"
import {CarModelHasImageResponse} from "./types/CarModelHasImageResponse"

export async function getHasImageRelations(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationships = await CarModel.getRelationshipsForHasImage(carModelId)
        const marshalledRelationships = marshalHasImageRelationships(relationships)

        send200response(marshalledRelationships, res)
    } catch (e) {
        console.error(e)
        send404response(res)
    }
}

function send200response(data: Array<CarModelHasImageResponse>, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Did you provide a valid "Car Model" ID?')
}
