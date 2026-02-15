import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.RACING_EVENT, NodeTypeEnum.IMAGE, DbRelationship.RacingEventHasPrimeImage)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.RacingEventHasPrimeImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const relationships = await getRelationshipCollection(
            racingEvent.id,
            DbRelationship.RacingEventHasPrimeImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.RacingEventHasPrimeImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
