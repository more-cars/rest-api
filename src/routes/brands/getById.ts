import express from "express"
import {Brand} from "../../models/Brand"
import {marshal} from "./marshal"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const foundNode = await Brand.findById(nodeId)
    if (!foundNode) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        return res.send(`A "Brand" with ID ${req.params.id} could not be found.`)
    }

    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(marshal(foundNode))
}
