import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A TRACK LAYOUT can have multiple ›was-used-by-racing-event‹ relationships', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(DbNodeType.RacingEvent, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.properties.id, racingEvent.properties.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.properties.id,
        RelationshipType.TrackLayoutWasUsedByRacingEvent,
        DbNodeType.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
