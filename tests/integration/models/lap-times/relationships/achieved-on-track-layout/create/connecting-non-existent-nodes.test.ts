import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-on-track-layout‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(-42, trackLayout.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
