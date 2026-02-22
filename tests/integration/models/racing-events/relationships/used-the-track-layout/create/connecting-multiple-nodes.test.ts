import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A RACING EVENT cannot have multiple ›used-the-track-layout‹ relationships', async () => {
    const racingEvent = await seedNode(DbNodeType.RacingEvent)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(DbNodeType.TrackLayout, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.properties.id, trackLayout.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.properties.id,
        RelationshipType.RacingEventUsedTheTrackLayout,
        DbNodeType.TrackLayout,
    )

    expect(relationships.length)
        .toBe(1)
})
