import {seedBrand} from "../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../../../src/db/createRelationship"
import {DbRelationship} from "../../../../../../src/types/DbRelationship"
import {BrandRelationship} from "../../../../../../src/types/brands/BrandRelationship"

describe('Brand', () => {
    test('Creating a "Brand has Car Model" relationship when both nodes exist', async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const createdRelationship = await createRelationship(
            brand.id as number,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
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
            DbRelationship.BrandHasCarModel,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
