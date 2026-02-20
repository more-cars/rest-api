import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-on-track-layout‹ relationship with valid data', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    const createdRelationship = await LapTime.createAchievedOnTrackLayoutRelationship(lapTime.id, trackLayout.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(lapTime.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.LapTimeAchievedOnTrackLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
