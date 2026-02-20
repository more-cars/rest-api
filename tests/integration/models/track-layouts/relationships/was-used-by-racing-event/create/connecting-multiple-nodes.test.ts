import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A TRACK LAYOUT can have multiple ›was-used-by-racing-event‹ relationships', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(ControllerNodeType.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        RelationshipType.TrackLayoutWasUsedByRacingEvent,
        Neo4jNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
