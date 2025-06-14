import express from "express"
import {CarModel} from "../../../models/car-models/CarModel"
import {marshal} from "./marshal"

export async function getById(req: express.Request, res: express.Response) {
    const foundCarModel = await CarModel.findById(parseInt(req.params.id))
    if (!foundCarModel) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send(`A "Car Model" with ID ${req.params.id} could not be found.`)
        return
    }

    res.status(200)
    res.set('Content-Type', 'application/json')
    res.send(marshal(foundCarModel))
}
