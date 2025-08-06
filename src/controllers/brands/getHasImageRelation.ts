import express from "express"
import {Brand} from "../../models/brands/Brand"
import {BrandHasImageResponse} from "./types/BrandHasImageResponse"
import {marshalHasImageRelationship} from "./marshalling/marshalHasImageRelationship"

export async function getHasImageRelation(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)
    const imageId = parseInt(req.params.imageId)

    try {
        const relationship = await Brand.getRelationshipForHasImage(brandId, imageId)

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

function send200response(data: BrandHasImageResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Did you provide valid "Brand" and "Image" IDs?')
}
