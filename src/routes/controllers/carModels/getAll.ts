import express from "express"
import {CarModel} from "../../../models/car-models/CarModel"
import {marshalAll} from "./marshalAll"

export async function getAll(req: express.Request, res: express.Response) {
    const foundCarModels = await CarModel.findAll()

    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(marshalAll(foundCarModels))
}
