import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›achieved-on-track-layout‹ relationship again', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
