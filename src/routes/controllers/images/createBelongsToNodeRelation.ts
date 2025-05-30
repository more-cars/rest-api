import express from "express"
import {Image} from "../../../models/Image"
import {ImageRelationship} from "../../../types/images/ImageRelationship"

export async function createBelongsToNodeRelation(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)
    const partnerNodeId = parseInt(req.params.partnerNodeId)

    try {
        const createdRelationship = await Image.createBelongsToNodeRelationship(imageId, partnerNodeId)

        if (!createdRelationship) {
            res.status(422)
            res.set('Content-Type', 'text/plain')
            res.send('Request failed. Relationship could not be created.')

            return
        }

        res.status(201)
        res.set('Content-Type', 'application/json')
        res.send({
            image_id: imageId,
            partner_node_id: partnerNodeId,
            relationship_id: createdRelationship.relationship_id,
            relationship_name: ImageRelationship.belongsToNode,
        })
    } catch (e) {
        console.error(e)
        res.status(422)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Relationship could not be created.')
    }
}
