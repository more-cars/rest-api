import express from "express"
import {Image} from "../../models/images/Image"
import {marshalBelongsToNodeTypeRelationships} from "./marshalBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "./types/ImageBelongsToNodeTypeResponse"

export async function getBelongsToNodeTypeRelations(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)

    try {
        const relationships = await Image.getBelongsToNodeTypeRelationships(imageId)

        if (!relationships) {
            return send404response(res)
        }

        const marshalledData = marshalBelongsToNodeTypeRelationships(relationships)

        send200response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send422response(res)
    }
}

function send200response(data: ImageBelongsToNodeTypeResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Image not found.')
}

function send422response(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Relationships could not be retrieved.')
}
