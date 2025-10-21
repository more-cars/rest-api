import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {TrackLayoutRelationship} from "../../../../../../../src/models/track-layouts/types/TrackLayoutRelationship"

test('Creating a ›belongs-to-race-track‹ relationship with valid data', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

    const createdRelationship = await TrackLayout.createBelongsToRaceTrackRelationship(trackLayout.id, raceTrack.id)

    expect(createdRelationship.origin.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.destination.id)
        .toEqual(raceTrack.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(TrackLayoutRelationship.belongsToRaceTrack)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
