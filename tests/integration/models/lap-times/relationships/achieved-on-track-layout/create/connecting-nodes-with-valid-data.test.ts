import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {LapTimeRelationship} from "../../../../../../../src/models/lap-times/types/LapTimeRelationship"

test('Creating a ›achieved-on-track-layout‹ relationship with valid data', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    const createdRelationship = await LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id)

    expect(createdRelationship.origin.id)
        .toEqual(lapTime.id)
    expect(createdRelationship.destination.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(LapTimeRelationship.achievedOnTrackLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
