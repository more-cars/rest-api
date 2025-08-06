import {expect, test} from 'vitest'
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('An empty list should be returned when no IMAGE is connected to the CAR MODEL',
    async () => {
        const carModel = await seedCarModel()

        const relationships = await getRelationshipsForSpecificNode(
            carModel.id,
            DbRelationship.NodeHasImage,
            true,
        )

        expect(relationships.length)
            .toBe(0)
    })
