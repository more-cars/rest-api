import {expect, test} from 'vitest'
import {deleteAllRaceTracks} from "../../../../_toolbox/dbSeeding/race-tracks/nodes/deleteAllRaceTracks"
import {RaceTrackNode} from "../../../../../src/db/nodes/race-tracks/types/RaceTrackNode"
import {seedRaceTracks} from "../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTracks"
import {getAllNodesOfType} from "../../../../../src/db/nodes/race-tracks/getAllNodesOfType"

test('When there are no RACE TRACKS then an empty array should be returned', async () => {
    await deleteAllRaceTracks()

    const expectedRaceTracks: Array<RaceTrackNode> = []
    const actualRaceTracks = await getAllNodesOfType()

    expect(actualRaceTracks)
        .toEqual(expectedRaceTracks)
})

test('When RACE TRACKS exist then all of them should be returned', async () => {
    await deleteAllRaceTracks()
    const amount = Math.ceil(Math.random() * 50)
    await seedRaceTracks(amount)

    const actualRaceTracks = await getAllNodesOfType()

    expect(actualRaceTracks.length)
        .toEqual(amount)
})
