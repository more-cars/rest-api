import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting a ›belongs-to-race-track‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.TrackLayout, DbNodeType.RaceTrack, RelationshipType.TrackLayoutBelongsToRaceTrack)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
            DbNodeType.RaceTrack,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        const relationships = await getRelationshipCollection(
            trackLayout.properties.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
            DbNodeType.RaceTrack,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
            DbNodeType.RaceTrack,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
