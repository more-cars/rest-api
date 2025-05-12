import {seedBrand} from "../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../dbSeeding/seedCarModel"
import {Brand} from "../../../../src/models/Brand"
import {BrandRelationship} from "../../../../src/types/brands/BrandRelationship"
import {BrandHasCarModelRelationship} from "../../../../src/types/brands/BrandHasCarModelRelationship"

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
})
