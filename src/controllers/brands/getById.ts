import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshal} from "./marshal"
import {BrandResponse} from "./types/BrandResponse"

export async function getById(req: express.Request, res: express.Response) {
    const nodeId = parseInt(req.params.id)
    const node = await Brand.findById(nodeId)

    if (!node) {
        return send404response(res, nodeId)
    }

    const marshalledData = marshal(node)

    send200response(marshalledData, res)
}

function send200response(data: BrandResponse, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}

function send404response(res: express.Response, failedId: number) {
    res.status(404)
    res.set('Content-Type', 'text/plain')
    res.send(`A "Brand" with ID ${failedId} could not be found.`)
}
