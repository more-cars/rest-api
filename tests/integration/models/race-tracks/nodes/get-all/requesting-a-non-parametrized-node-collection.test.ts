import {describe, expect, test} from 'vitest'
import {deleteAllRaceTracks} from "../../../../../_toolbox/dbSeeding/race-tracks/nodes/deleteAllRaceTracks"
import type {RaceTrackNode} from "../../../../../../src/models/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {seedRaceTracks} from "../../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTracks"

describe('A non-parametrized "get all RACE TRACK nodes" request returns the correct number of nodes', () => {
    test('when there exist NO race track nodes', async () => {
        await deleteAllRaceTracks()

        const expectedNodes: Array<RaceTrackNode> = []
        const actualNodes = await RaceTrack.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist race track nodes', async () => {
        await deleteAllRaceTracks()
        const amount = Math.ceil(Math.random() * 20)
        await seedRaceTracks(amount)

        const actualNodes = await RaceTrack.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
