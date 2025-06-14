import express from "express"
import {Brand} from "../../../models/brands/Brand"
import {CarModel} from "../../../models/car-models/CarModel"
import {BrandRelationship} from "../../../types/brands/BrandRelationship"

export async function createHasCarModelRelation(req: express.Request, res: express.Response) {
    const brand = await Brand.findById(parseInt(req.params.brandId))
    const carModel = await CarModel.findById(parseInt(req.params.carModelId))

    if (!brand || !carModel) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Node not found.')

        return
    }

    try {
        const createdRelationship = await Brand.createHasCarModelRelationship(brand, carModel)

        if (!createdRelationship) {
            res.status(422)
            res.set('Content-Type', 'text/plain')
            res.send('Request failed. Relationship could not be created.')

            return
        }

        res.status(201)
        res.set('Content-Type', 'application/json')
        res.send({
            brand_id: brand.id,
            car_model_id: carModel.id,
            relationship_id: createdRelationship.relationship_id,
            relationship_name: BrandRelationship.hasCarModel,
        })
    } catch (e) {
        console.error(e)
        res.status(422)
        res.set('Content-Type', 'text/plain')
        res.send('Request failed. Relationship could not be created.')
    }
}
