import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting a ›used-the-track-layout‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.RacingEvent, DbNodeType.TrackLayout, RelationshipType.RacingEventUsedTheTrackLayout)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.RacingEventUsedTheTrackLayout,
            DbNodeType.TrackLayout,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventUsedTheTrackLayout,
            DbNodeType.TrackLayout,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingEventUsedTheTrackLayout,
            DbNodeType.TrackLayout,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
