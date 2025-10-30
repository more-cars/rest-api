import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.SESSION_RESULT, NodeTypeEnum.CAR_MODEL_VARIANT, DbRelationship.SessionResultAchievedWithCarModelVariant)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const relationships = await getRelationshipCollection(
            sessionResult.id,
            DbRelationship.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.SessionResultAchievedWithCarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
