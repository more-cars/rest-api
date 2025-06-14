import express from "express"
import {marshal} from "./marshal"
import {Image} from "../../../models/images/Image"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const foundNode = await Image.findById(nodeId)

    if (!foundNode) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send(`An "Image" with ID ${req.params.id} could not be found.`)
        return
    }

    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(marshal(foundNode))
}
