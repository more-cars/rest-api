import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-lap-time‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

    const createdRelationship = await TrackLayout.createHasLapTimeRelationship(trackLayout.id, lapTime.id)

    expect(createdRelationship.origin.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.destination.id)
        .toEqual(lapTime.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.TrackLayoutHasLapTime)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
