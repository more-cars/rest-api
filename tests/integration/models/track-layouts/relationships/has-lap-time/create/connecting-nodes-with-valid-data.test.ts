import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-lap-time‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

    const createdRelationship = await TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(lapTime.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.TrackLayoutHasLapTime)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
