import express from "express"
import {Image} from "../../../models/images/Image"

export async function getBelongsToNodeRelations(req: express.Request, res: express.Response) {
    const imageId = parseInt(req.params.imageId)

    try {
        const relationships = await Image.getBelongsToNodeRelationships(imageId)

        if (!relationships) {
            res.status(404)
            res.set('Content-Type', 'text/plain')
            res.send('Request failed. Image not found.')

            return
        }

        res.status(200)
        res.set('Content-Type', 'application/json')
        res.send(relationships)
    } catch (e) {
        console.error(e)
        res.status(422)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Relationships could not be retrieved.')
    }
}
