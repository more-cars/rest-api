import {describe, expect, test} from 'vitest'
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Requesting a ›has-successor‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.CAR_MODEL, DbRelationship.CarModelHasSuccessor)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.CarModelHasSuccessor,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedCarModel()

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.CarModelHasSuccessor,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.CarModelHasSuccessor,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
