import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›achieved-on-track-layout‹ relationship with nodes that do not exist', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

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
