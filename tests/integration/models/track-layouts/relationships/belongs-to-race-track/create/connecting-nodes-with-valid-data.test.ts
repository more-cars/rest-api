import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-race-track‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

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
