import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RaceTrackNode} from "../../../../../src/db/nodes/race-tracks/types/RaceTrackNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/race-tracks/getAllNodesOfType"

test('When there are no RACE TRACKS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RaceTrack)

    const expectedRaceTracks: RaceTrackNode[] = []
    const actualRaceTracks = await getAllNodesOfType()

    expect(actualRaceTracks)
        .toEqual(expectedRaceTracks)
})

test('When RACE TRACKS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.RaceTrack)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.RaceTrack, amount)

    const actualRaceTracks = await getAllNodesOfType()

    expect(actualRaceTracks.length)
        .toEqual(amount)
})
