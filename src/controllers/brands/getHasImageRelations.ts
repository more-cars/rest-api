import express from "express"
import {Brand} from "../../models/brands/Brand"
import {BrandHasImageResponse} from "./types/BrandHasImageResponse"
import {marshalHasImageRelationships} from "./marshalling/marshalHasImageRelationships"

export async function getHasImageRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationships = await Brand.getRelationshipsForHasImage(brandId)
        const marshalledRelationships = marshalHasImageRelationships(relationships)

        send200response(marshalledRelationships, res)
    } catch (e) {
        console.error(e)
        send404response(res)
    }
}

function send200response(data: Array<BrandHasImageResponse>, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Did you provide a valid "Brand" ID?')
}
