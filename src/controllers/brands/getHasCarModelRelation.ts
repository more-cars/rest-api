import express from "express"
import {Brand} from "../../models/brands/Brand"
import {BrandHasCarModelResponse} from "./types/BrandHasCarModelResponse"
import {marshalRelationship} from "./marshalRelationship"

export async function getHasCarModelRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.getRelationshipForHasCarModel(brandId, carModelId)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledRelationship = marshalRelationship(relationship)

        send200response(marshalledRelationship, res)
    } catch (e) {
        console.error(e)
        send404response(res)
    }
}

function send200response(data: BrandHasCarModelResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send("No relationship found. Either it doesn't exist or the provided IDs are invalid.")
}
