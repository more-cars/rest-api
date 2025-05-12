import {seedBrand} from "../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../dbSeeding/seedCarModel"
import {BaseRelationship} from "../../../../src/types/BaseRelationship"
import {createRelationship} from "../../../../src/db/createRelationship"

describe('Brand', () => {
    test('Creating a "Brand has Car Model" relationship when both nodes exist', async () => {
        const brand = await seedBrand()
        const carModel = await seedCarModel()

        const createdRelationship: BaseRelationship = await createRelationship(
            brand.id as number,
            carModel.id as number,
            'HAS_CAR_MODEL',
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', 'HAS_CAR_MODEL')
    })
})
