import {seedBrand} from "../../../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {createRelationship} from "../../../../../../src/db/createRelationship"
import {BrandRelationship} from "../../../../../../src/types/brands/BrandRelationship"

describe('Brand', () => {
    test('Creating a "Brand has Car Model" relationship when both nodes exist', async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const createdRelationship = await createRelationship(
            brand.id as number,
            carModel.id as number,
            BrandRelationship.hasCarModel,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', BrandRelationship.hasCarModel)
    })

    test('Invalid nodes fail the relationship creation', async () => {
        const brand = await seedBrand()
        
        const createdRelationship = await createRelationship(
            brand.id as number,
            -42,
            BrandRelationship.hasCarModel,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
