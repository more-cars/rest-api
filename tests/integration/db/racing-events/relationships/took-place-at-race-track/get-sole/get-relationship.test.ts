import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting a ›took-place-at-race-track‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(ControllerNodeType.RACING_EVENT, ControllerNodeType.RACE_TRACK, RelationshipType.RacingEventTookPlaceAtRaceTrack)

        const relationships = await getRelationshipCollection(
            relationship.start_node.id,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
            NodeTypeLabel.RaceTrack,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const relationships = await getRelationshipCollection(
            racingEvent.id,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
            NodeTypeLabel.RaceTrack,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingEventTookPlaceAtRaceTrack,
            NodeTypeLabel.RaceTrack,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
