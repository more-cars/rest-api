import {seedBrand} from "../../../../../dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../../../src/db/createRelationship"
import {DbRelationship} from "../../../../../../src/types/DbRelationship"
import {BrandRelationship} from "../../../../../../src/types/brands/BrandRelationship"

describe('Car Model', () => {
    test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        // Using the same HAS_CAR_MODEL relationship here as in the Brand nodes.
        // Crating a second relationship for the opposite direction (BELONGS_TO_BRAND) would make no sense.
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
        const carModel = await seedCarModel()

        const createdRelationship = await createRelationship(
            -42,
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
