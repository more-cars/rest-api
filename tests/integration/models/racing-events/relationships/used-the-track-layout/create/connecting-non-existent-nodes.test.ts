import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›used-the-track-layout‹ relationship with nodes that do not exist', async () => {
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(-42, trackLayout.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(racingEvent.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingEvent.createUsedTheTrackLayoutRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
