import {expect, test} from 'vitest'
import {RaceTrack} from "../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a RACE TRACK that does not exist should return "false"', async () => {
    const expectedRaceTrack = false
    const actualRaceTrack = await RaceTrack.findById(-42)

    expect(actualRaceTrack)
        .toEqual(expectedRaceTrack)
})

test('When the RACE TRACK exists it should be returned', async () => {
    const expectedRaceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
    const actualRaceTrack = await RaceTrack.findById(expectedRaceTrack.properties.id)

    expect(actualRaceTrack)
        .toEqual(expectedRaceTrack.properties)
})
