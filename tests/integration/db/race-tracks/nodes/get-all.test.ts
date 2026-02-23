import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {RaceTrackNode} from "../../../../../src/db/node-types/race-tracks/types/RaceTrackNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/race-tracks/getAllNodesOfType"

test('When there are no RACE TRACKS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RaceTrack)

    const expectedRaceTracks: RaceTrackNode[] = []
    const actualRaceTracks = await getAllNodesOfType()

    expect(actualRaceTracks)
        .toEqual(expectedRaceTracks)
})

test('When RACE TRACKS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.RaceTrack)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(DbNodeType.RaceTrack, amount)

    const actualRaceTracks = await getAllNodesOfType()

    expect(actualRaceTracks.length)
        .toEqual(amount)
})
