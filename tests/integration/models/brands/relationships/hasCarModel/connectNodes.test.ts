import {seedBrand} from "../../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {BrandHasCarModelRelationship} from "../../../../../../src/types/brands/BrandHasCarModelRelationship"
import {Brand} from "../../../../../../src/models/Brand"
import {BrandRelationship} from "../../../../../../src/types/brands/BrandRelationship"

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
})
