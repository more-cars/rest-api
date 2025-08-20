import express from "express"
import {Brand} from "../../models/brands/Brand"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const success = await Brand.delete(nodeId)

    if (!success) {
        return send404response(res)
    }

    send204response(res)
}

function send204response(res: express.Response) {
    res.status(204)
    res.set('Content-Type', 'application/json')
    res.send()
}

function send404response(res: express.Response) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send(`A "Brand" with the provided ID could not be found.`)
}
