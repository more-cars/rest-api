import {seedBrand} from "../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../dbSeeding/seedCarModel"
import {CarModel} from "../../../../../src/models/CarModel"
import {CarModelRelationship} from "../../../../../src/types/car-models/CarModelRelationship"
import {
    CarModelBelongsToBrandRelationship
} from "../../../../../src/types/car-models/CarModelBelongsToBrandRelationship"
import {getRelationship} from "../../../../../src/db/getRelationship"
import {BrandRelationship} from "../../../../../src/types/brands/BrandRelationship"

describe('Car Model', () => {
    test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const createdRelationship: CarModelBelongsToBrandRelationship = await CarModel.createBelongsToBrandRelationship(carModel, brand)

        expect(createdRelationship)
            .toHaveProperty('car_model_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('brand_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelRelationship.belongsToBrand)
    })

    test('The relationship ID should not change when creating the same relationship again', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        const relationshipBefore: CarModelBelongsToBrandRelationship =
            await CarModel.createBelongsToBrandRelationship(carModel, brand)
        const relationshipAfter: CarModelBelongsToBrandRelationship =
            await CarModel.createBelongsToBrandRelationship(carModel, brand)

        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    })

    test('Attaching the car model to another brand removes the original relationship', async () => {
        const firstBrand = await seedBrand()
        const secondBrand = await seedBrand()
        const carModel = await seedCarModel()

        await CarModel.createBelongsToBrandRelationship(carModel, firstBrand)
        const originalRelationship = await getRelationship(
            firstBrand.id as number,
            carModel.id as number,
            BrandRelationship.hasCarModel,
        )
        expect(originalRelationship).not.toBeFalsy()

        await CarModel.createBelongsToBrandRelationship(carModel, secondBrand)
        const newRelationship = await getRelationship(
            secondBrand.id as number,
            carModel.id as number,
            BrandRelationship.hasCarModel,
        )
        expect(newRelationship).not.toBeFalsy()

        const refetchedOriginalRelationship = await getRelationship(
            firstBrand.id as number,
            carModel.id as number,
            BrandRelationship.hasCarModel,
        )
        expect(refetchedOriginalRelationship).toBeFalsy()
    })
})
