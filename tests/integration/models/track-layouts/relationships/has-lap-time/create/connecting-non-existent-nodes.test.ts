import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-lap-time‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    await expect(TrackLayout.createHasLapTimeRelationship(-42, lapTime.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasLapTimeRelationship(trackLayout.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createHasLapTimeRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
