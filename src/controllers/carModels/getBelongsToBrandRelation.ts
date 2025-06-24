import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalRelationship} from "./marshalRelationship"
import {CarModelBelongsToBrandResponse} from "./types/CarModelBelongsToBrandResponse"

export async function getBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await CarModel.getRelationshipForBelongsToBrand(carModelId)

        if (!relationship) {
            send200response(null, res)
        } else {
            send200response(marshalRelationship(relationship), res)
        }
    } catch (e) {
        console.error(e)
        send404response(res)
    }
}

function send200response(data: null | CarModelBelongsToBrandResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Did you provide a valid "Car Model" ID?')
}
