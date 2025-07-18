import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"
import {BrandHasImageResponse} from "./types/BrandHasImageResponse"

export async function createHasImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Brand.createHasImageRelationship(brandId, imageId)

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

function send201response(data: BrandHasImageResponse, res: express.Response) {
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
