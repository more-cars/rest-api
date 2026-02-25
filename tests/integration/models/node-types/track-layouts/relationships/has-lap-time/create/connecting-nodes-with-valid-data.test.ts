import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-lap-time‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const lapTime = await seedNode(DbNodeType.LapTime)

    const createdRelationship = await TrackLayout.createHasLapTimeRelationship(trackLayout.properties.id, lapTime.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.destination.attributes.id)
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
