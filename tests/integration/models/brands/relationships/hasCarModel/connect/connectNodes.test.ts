import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

test('Creating a "Brand has Car Model" relationship when both nodes exist', async () => {
    const brand = await seedBrand()
    const carModel = await seedCarModel()

    const createdRelationship = await Brand.createHasCarModelRelationship(brand, carModel)

    expect(createdRelationship)
        .toHaveProperty('brand_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('car_model_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', BrandRelationship.hasCarModel)
})
