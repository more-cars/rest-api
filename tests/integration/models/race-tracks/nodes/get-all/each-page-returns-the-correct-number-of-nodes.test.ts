import {describe, expect, test} from 'vitest'
import {deleteAllRaceTracks} from "../../../../../_toolbox/dbSeeding/race-tracks/nodes/deleteAllRaceTracks"
import type {RaceTrackNode} from "../../../../../../src/models/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {seedRaceTracks} from "../../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTracks"

describe('Each page of a "get all RACE TRACK nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO race track nodes (page=$0)', async (page) => {
        await deleteAllRaceTracks()

        const expectedNodes: Array<RaceTrackNode> = []
        const actualNodes = await RaceTrack.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 race track nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllRaceTracks()
        await seedRaceTracks(totalNodeAmount)

        const actualNodes = await RaceTrack.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
