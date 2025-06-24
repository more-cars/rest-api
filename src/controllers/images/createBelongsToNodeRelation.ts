import express from "express"
import {Image} from "../../models/images/Image"
import {marshalRelationship} from "./marshalRelationship"
import {ImageBelongsToNodeResponse} from "./types/ImageBelongsToNodeResponse"

export async function createBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    if (!imageId || !partnerNodeId) {
        return send404response(res)
    }

    try {
        const relationship = await Image.createBelongsToNodeRelationship(imageId, partnerNodeId)

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

function send201response(data: ImageBelongsToNodeResponse, res: express.Response) {
    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Image ID and/or partner node ID not found.')
}

function send422response(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Relationship could not be created.')
}
