import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-on-track-layout‹ relationship with valid data', async () => {
    const lapTime = await seedNode(DbNodeType.LapTime)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    const createdRelationship = await LapTime.createAchievedOnTrackLayoutRelationship(lapTime.properties.id, trackLayout.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(lapTime.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.LapTimeAchievedOnTrackLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
