import express from "express"
import {Brand} from "../../../models/Brand"
import {CarModel} from "../../../models/CarModel"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const brand = await Brand.findById(parseInt(req.params.brandId))
    const carModel = await CarModel.findById(parseInt(req.params.carModelId))

    if (!brand || !carModel) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Node not found.')

        return
    }
}
