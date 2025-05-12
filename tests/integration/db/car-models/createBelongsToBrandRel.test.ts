import {seedBrand} from "../../../dbSeeding/seedBrand"
import {seedCarModel} from "../../../dbSeeding/seedCarModel"
import {BaseRelationship} from "../../../../src/types/BaseRelationship"
import {createRelationship} from "../../../../src/db/createRelationship"
import {BrandRelationship} from "../../../../src/types/brands/BrandRelationship"

describe('Car Model', () => {
    test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
        const carModel = await seedCarModel()
        const brand = await seedBrand()

        // Using the same HAS_CAR_MODEL relationship here as in the Brand nodes.
        // Crating a second relationship for the opposite direction (BELONGS_TO_BRAND) would make no sense.
        const createdRelationship: BaseRelationship = await createRelationship(
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
})
