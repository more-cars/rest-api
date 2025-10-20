import {describe, expect, test} from 'vitest'
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Requesting a ›is-successor-of‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.CAR_MODEL, DbRelationship.CarModelIsSuccessorOf)

        const relationships = await getRelationshipsForSpecificNode(
            relationship.start_node_id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedCarModel()

        const relationships = await getRelationshipsForSpecificNode(
            carModel.id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
