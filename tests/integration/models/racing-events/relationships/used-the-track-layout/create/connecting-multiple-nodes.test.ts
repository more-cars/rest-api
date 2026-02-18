import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING EVENT cannot have multiple ›used-the-track-layout‹ relationships', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(NodeTypeEnum.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(
        racingEvent.id,
        RelationshipType.RacingEventUsedTheTrackLayout,
        NodeTypeLabel.TrackLayout,
    )

    expect(relationships.length)
        .toBe(1)
})
