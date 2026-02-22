import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-race-track‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const raceTrack = await seedNode(DbNodeType.RaceTrack)

    const createdRelationship = await TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.properties.id, raceTrack.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(raceTrack.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.TrackLayoutBelongsToRaceTrack)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
