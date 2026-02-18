import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›hosted-racing-event‹ relationship with valid data', async () => {
    const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
    const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

    const createdRelationship = await RaceTrack.createHostedRacingEventRelationship(raceTrack.id, racingEvent.id)

    expect(createdRelationship.origin.id)
        .toEqual(raceTrack.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingEvent.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RaceTrackHostedRacingEvent)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
