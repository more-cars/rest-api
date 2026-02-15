import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting a ›achieved-with-car-model-variant‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.CAR_MODEL_VARIANT, DbRelationship.LapTimeAchievedWithCarModelVariant)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.LapTimeAchievedWithCarModelVariant,
            NodeTypeLabel.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const relationships = await getRelationshipCollection(
            lapTime.id,
            DbRelationship.LapTimeAchievedWithCarModelVariant,
            NodeTypeLabel.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.LapTimeAchievedWithCarModelVariant,
            NodeTypeLabel.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
