import {describe, expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"

describe('Requesting a ›is-successor-of‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.CAR_MODEL, NodeTypeEnum.CAR_MODEL, DbRelationship.CarModelIsSuccessorOf)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const relationships = await getRelationshipCollection(
            carModel.id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
