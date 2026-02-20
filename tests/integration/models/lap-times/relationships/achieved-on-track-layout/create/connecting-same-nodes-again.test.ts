import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-on-track-layout‹ relationship again', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
