import express from "express"
import {Image} from "../../models/images/Image"
import {marshal} from "./marshal"
import {ImageResponse} from "./types/ImageResponse"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const node = await Image.findById(nodeId)

    if (!node) {
        return send404response(res, nodeId)
    }

    const marshalledData = marshal(node)

    send200response(marshalledData, res)
}

function send200response(data: ImageResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response, failedId: number) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send(`An "Image" with ID ${failedId} could not be found.`)
}
