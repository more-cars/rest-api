import express from "express"
import {CarModel} from "../../../models/car-models/CarModel"
import {marshalRelationship} from "./marshalRelationship"

export async function getBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)

    try {
        const relationship = await CarModel.getRelationshipForBelongsToBrand(carModelId)

        res.status(200)
        res.set('Content-Type', 'application/json')

        if (!relationship) {
            res.send(null)
        } else {
            res.send(marshalRelationship(relationship))
        }
    } catch (e) {
        console.error(e)
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Did you provide a valid "Car Model" ID?')
    }
}
