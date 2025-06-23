import express from "express"
import {Image} from "../../models/images/Image"
import {marshalAll} from "./marshalAll"
import {ImageResponse} from "./types/ImageResponse"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await Image.findAll()
    const marshalledData = marshalAll(nodes)

    send200response(marshalledData, res)
}

function send200response(data: Array<ImageResponse>, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}
