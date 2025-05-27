import express from "express"
import {Image} from "../../../models/Image"
import {unmarshal} from "./unmarshal"
import {marshal} from "./marshal"

export async function create(req: express.Request, res: express.Response) {
    try {
        const createdNode = await Image.create(unmarshal(req.body))
        res.status(201)
        res.set('Content-Type', 'application/json')
        res.send(marshal(createdNode))
    } catch (e) {
        console.error(e)
        res.status(422)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Node could not be created.')
    }
}
