import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RaceTrack} from "../../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-main-video‹ relationship with valid data', async () => {
    const raceTrack = await seedNode(DbNodeType.RaceTrack)
    const video = await seedNode(DbNodeType.Video)

    const createdRelationship = await RaceTrack.createHasMainVideoRelationship(raceTrack.properties.id, video.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(raceTrack.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(video.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RaceTrackHasMainVideo)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
