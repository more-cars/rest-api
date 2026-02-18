import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-layout‹ relationship with valid data', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    const createdRelationship = await RaceTrack.createHasLayoutRelationship(raceTrack.id, trackLayout.id)

    expect(createdRelationship.origin.id)
        .toEqual(raceTrack.id)
    expect(createdRelationship.destination.id)
        .toEqual(trackLayout.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RaceTrackHasLayout)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
