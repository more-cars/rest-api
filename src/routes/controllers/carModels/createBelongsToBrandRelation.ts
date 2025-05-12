import express from "express"
import {CarModel} from "../../../models/CarModel"
import {Brand} from "../../../models/Brand"
import {CarModelRelationship} from "../../../types/car-models/CarModelRelationship"

export async function createBelongsToBrandRelation(req: express.Request, res: express.Response) {
    const carModel = await CarModel.findById(parseInt(req.params.carModelId))
    const brand = await Brand.findById(parseInt(req.params.brandId))

    if (!carModel || !brand) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Node not found.')

        return
    }

    const createdRelationship = await CarModel.createBelongsToBrandRelationship(carModel, brand)

    res.status(201)
    res.set('Content-Type', 'application/json')
    res.send({
        car_model_id: carModel.id,
        brand_id: brand.id,
        relationship_id: createdRelationship.relationship_id,
        relationship_name: CarModelRelationship.belongsToBrand,
    })
}
