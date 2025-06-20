import express from "express"
import {CarModel} from "../../models/car-models/CarModel"
import {marshalAll} from "./marshalAll"
import {CarModelResponse} from "./types/CarModelResponse"

export async function getAll(req: express.Request, res: express.Response) {
    const nodes = await CarModel.findAll()
    const marshalledData = marshalAll(nodes)

    send200response(marshalledData, res)
}

function send200response(data: Array<CarModelResponse>, res: express.Response) {
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(data)
}
