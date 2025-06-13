import express from "express"
import {Brand} from "../../../models/Brand"
import {marshalRelationships} from "./marshalRelationships"

export async function getHasCarModelRelations(req: express.Request, res: express.Response) {
    const brandId = parseInt(req.params.brandId)

    try {
        const relationships = await Brand.getRelationshipsForHasCarModel(brandId)

        res.status(200)
        res.set('Content-Type', 'application/json')
        res.send(marshalRelationships(relationships))
    } catch (e) {
        console.error(e)
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Did you provide a valid "Brand" ID?')
    }
}
