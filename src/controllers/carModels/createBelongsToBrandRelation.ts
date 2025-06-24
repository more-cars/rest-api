import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalRelationship} from "./marshalRelationship"
import {CarModelBelongsToBrandResponse} from "./types/CarModelBelongsToBrandResponse"

export async function createBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await CarModel.createBelongsToBrandRelationship(carModelId, brandId)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledData = marshalRelationship(relationship)

        send201response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send422response(res)
    }
}

function send201response(data: CarModelBelongsToBrandResponse, res: express.Response) {
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
