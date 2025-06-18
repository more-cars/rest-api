import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/types/DbRelationship"

test('An empty list should be returned when no BRAND is connected to the CAR MODEL',
    async () => {
        const carModel = await seedCarModel()

        const relationships = await getRelationshipsForSpecificNode(
            carModel.id as number,
            DbRelationship.BrandHasCarModel,
            true,
        )

        expect(relationships.length)
            .toBe(0)
    })
