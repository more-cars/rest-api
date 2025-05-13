import {seedBrand} from "../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../dbSeeding/seedCarModel"
import {Brand} from "../../../../../src/models/Brand"
import {BrandRelationship} from "../../../../../src/types/brands/BrandRelationship"
import {BrandHasCarModelRelationship} from "../../../../../src/types/brands/BrandHasCarModelRelationship"
import {getRelationship} from "../../../../../src/db/getRelationship"

describe('Brand', () => {
    test('Creating a "Brand has Car Model" relationship when both nodes exist', async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const createdRelationship: BrandHasCarModelRelationship = await Brand.createHasCarModelRelationship(brand, carModel)

        expect(createdRelationship)
            .toHaveProperty('brand_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('car_model_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', BrandRelationship.hasCarModel)
    })

    test('The relationship ID should not change when creating the same relationship again', async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const relationshipBefore: BrandHasCarModelRelationship =
            await Brand.createHasCarModelRelationship(brand, carModel)
        const relationshipAfter: BrandHasCarModelRelationship =
            await Brand.createHasCarModelRelationship(brand, carModel)

        expect(relationshipAfter.relationship_id)
            .toEqual(relationshipBefore.relationship_id)
    })

    test('Attaching the car model to another brand removes the original relationship', async () => {
        const firstBrand = await seedBrand()
        const secondBrand = await seedBrand()
        const carModel = await seedCarModel()

        await Brand.createHasCarModelRelationship(firstBrand, carModel)
        const originalRelationship = await getRelationship(
            firstBrand.id as number,
            carModel.id as number,
            BrandRelationship.hasCarModel,
        )
        expect(originalRelationship).not.toBeFalsy()

        await Brand.createHasCarModelRelationship(secondBrand, carModel)
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
