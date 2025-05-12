import express from "express"
import {CarModel} from "../../../models/CarModel"
import {Brand} from "../../../models/Brand"

export async function createBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModel = await CarModel.findById(parseInt(req.params.carModelId))
    const brand = await Brand.findById(parseInt(req.params.brandId))

    if (!carModel || !brand) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Node not found.')

        return
    }
}
