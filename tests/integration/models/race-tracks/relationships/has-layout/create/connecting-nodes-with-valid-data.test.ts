import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-layout‹ relationship with valid data', async () => {
    const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    const createdRelationship = await RaceTrack.createHasLayoutRelationship(raceTrack.properties.id, trackLayout.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(raceTrack.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(trackLayout.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RaceTrackHasLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
