import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A TRACK LAYOUT can have multiple ›was-used-by-racing-event‹ relationships', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingEventsAmount = 3
    const racingEvents = await seedNodes(NodeTypeEnum.RACING_EVENT, racingEventsAmount)

    for (const racingEvent of racingEvents) {
        await TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.id, racingEvent.id)
    }

    const relationships = await getRelationshipCollection(
        trackLayout.id,
        DbRelationship.TrackLayoutWasUsedByRacingEvent,
        NodeTypeLabel.RacingEvent,
    )

    expect(relationships.length)
        .toBe(racingEventsAmount)
})
