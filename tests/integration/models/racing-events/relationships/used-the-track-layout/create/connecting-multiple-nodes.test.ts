import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING EVENT cannot have multiple ›used-the-track-layout‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(NodeTypeEnum.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id)
    }

    const relationships = await getRelationshipsForSpecificNode(racingEvent.id, DbRelationship.RacingEventUsedTheTrackLayout)

    expect(relationships.length)
        .toBe(1)
})
