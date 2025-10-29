import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {
    getRelationshipCollection
} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting a ›belongs-to-race-track‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.RACE_TRACK, NodeTypeEnum.TRACK_LAYOUT, DbRelationship.TrackLayoutBelongsToRaceTrack)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationships = await getRelationshipCollection(
            trackLayout.id,
            DbRelationship.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
