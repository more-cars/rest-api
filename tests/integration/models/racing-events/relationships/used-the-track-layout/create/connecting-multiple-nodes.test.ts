import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING EVENT cannot have multiple ›used-the-track-layout‹ relationships', async () => {
    const racingEvent = await seedNode(ControllerNodeType.RacingEvent)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(ControllerNodeType.TrackLayout, trackLayoutsAmount)

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
