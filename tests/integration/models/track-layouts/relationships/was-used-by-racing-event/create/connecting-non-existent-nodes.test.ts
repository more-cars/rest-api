import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›was-used-by-racing-event‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(-42, racingEvent.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(trackLayout.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createWasUsedByRacingEventRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
