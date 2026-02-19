import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting a ›achieved-on-track-layout‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.LAP_TIME, NodeTypeEnum.TRACK_LAYOUT, RelationshipType.LapTimeAchievedOnTrackLayout)

        const relationships = await getRelationshipCollection(
            relationship.start_node.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
            NodeTypeLabel.TrackLayout,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const relationships = await getRelationshipCollection(
            lapTime.id,
            RelationshipType.LapTimeAchievedOnTrackLayout,
            NodeTypeLabel.TrackLayout,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.LapTimeAchievedOnTrackLayout,
            NodeTypeLabel.TrackLayout,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
