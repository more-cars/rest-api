import express from "express"
import {Brand} from "../../models/brands/Brand"
import {marshalAll} from "./marshalAll"
import {BrandResponse} from "./types/BrandResponse"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await Brand.findAll()
    const marshalledData = marshalAll(nodes)

    send200response(marshalledData, res)
}

function send200response(data: Array<BrandResponse>, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}
