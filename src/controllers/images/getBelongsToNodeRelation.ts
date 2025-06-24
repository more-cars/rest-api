import express from "express"
import {Image} from "../../models/images/Image"
import {ImageBelongsToNodeResponse} from "./types/ImageBelongsToNodeResponse"
import {marshalRelationship} from "./marshalRelationship"

export async function getBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const relationship = await Image.getBelongsToNodeRelationship(imageId, partnerNodeId)

        if (!relationship) {
            return send404response(res)
        }

        const marshalledData = marshalRelationship(relationship)

        send200response(marshalledData, res)
    } catch (e) {
        console.error(e)
        send422response(res)
    }
}

function send200response(data: ImageBelongsToNodeResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Either the nodes or the relationship does not exist.')
}

function send422response(res: express.Response) {
    res.status(422)
    res.set('Content-Type', 'text/plain')
    res.send('Request failed. Relationship could not be retrieved.')
}
