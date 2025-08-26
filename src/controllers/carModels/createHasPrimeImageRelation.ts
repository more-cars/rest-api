import express from "express"
import {marshalHasPrimeImageRelationship} from "./marshalling/marshalHasPrimeImageRelationship"
import {CarModel} from "../../models/car-models/CarModel"
import {CarModelHasPrimeImageResponse} from "./types/CarModelHasPrimeImageResponse"

export async function createHasPrimeImageRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await CarModel.createHasPrimeImageRelationship(carModelId, imageId)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledData = marshalHasPrimeImageRelationship(relationship)

        send201response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send500response(res)
    }
}

function send201response(data: CarModelHasPrimeImageResponse, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Node not found.')
}

function send500response(res: express.Response) {
    res.status(500)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Relationship could not be created.')
}
