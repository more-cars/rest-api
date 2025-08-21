import express from "express"
import {CarModel} from "../../models/car-models/CarModel"

export async function deleteNode(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const success = await CarModel.delete(nodeId)

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
    res.send(`A "Car Model" with the provided ID could not be found.`)
}
