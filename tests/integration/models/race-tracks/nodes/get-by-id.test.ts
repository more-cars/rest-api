import {expect, test} from 'vitest'
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"
import {seedRaceTrack} from "../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTrack"

test('Fetching a RACE TRACK that does not exist should return "false"', async () => {
    const expectedRaceTrack = false
    const actualRaceTrack = await RaceTrack.findById(-42)

    expect(actualRaceTrack)
        .toEqual(expectedRaceTrack)
})

test('When the RACE TRACK exists it should be returned', async () => {
    const expectedRaceTrack = await seedRaceTrack()
    const actualRaceTrack = await RaceTrack.findById(expectedRaceTrack.id)

    expect(actualRaceTrack)
        .toEqual(expectedRaceTrack)
})
