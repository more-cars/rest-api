import express from "express"
import {Brand} from "../../models/brands/Brand"
import {BrandHasCarModelResponse} from "./types/BrandHasCarModelResponse"
import {marshalRelationship} from "./marshalRelationship"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const carModelId = parseInt(req.params.carModelId)
    const brandId = parseInt(req.params.brandId)

    try {
        const relationship = await Brand.createHasCarModelRelationship(brandId, carModelId)

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

function send201response(data: BrandHasCarModelResponse, res: express.Response) {
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
