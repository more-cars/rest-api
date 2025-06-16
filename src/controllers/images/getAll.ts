import express from "express"
import {marshalAll} from "./marshalAll"
import {Image} from "../../models/images/Image"

export async function getAll(req: express.Request, res: express.Response) {
    const foundNodes = await Image.findAll()

    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(marshalAll(foundNodes))
}
