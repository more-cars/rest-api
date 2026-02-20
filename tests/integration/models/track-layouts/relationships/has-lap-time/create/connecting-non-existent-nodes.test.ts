import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-lap-time‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

    await expect(TrackLayout.createHasLapTimeRelationship(-42, lapTime.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasLapTimeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
