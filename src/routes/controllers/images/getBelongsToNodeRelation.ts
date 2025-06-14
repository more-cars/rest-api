import express from "express"
import {Image} from "../../../models/images/Image"

export async function getBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const relationship = await Image.getBelongsToNodeRelationship(imageId, partnerNodeId)

        if (!relationship) {
            res.status(404)
            res.set('Content-Type', 'text/plain')
            res.send('Request failed. Either the nodes or the relationship does not exist.')

            return
        }

        res.status(200)
        res.set('Content-Type', 'application/json')
        res.send(relationship)
    } catch (e) {
        console.error(e)
        res.status(422)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Relationship could not be retrieved.')
    }
}
