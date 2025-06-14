import express from "express"
import {Brand} from "../../../models/brands/Brand"
import {marshalAll} from "./marshalAll"

export async function getAll(req: express.Request, res: express.Response) {
    const foundNodes = await Brand.findAll()

    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(marshalAll(foundNodes))
}
