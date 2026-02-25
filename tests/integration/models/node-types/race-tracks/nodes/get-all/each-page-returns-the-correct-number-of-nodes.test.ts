import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RaceTrackNode} from "../../../../../../../src/models/node-types/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all RACE TRACK nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no RACE TRACK nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)

        const expectedNodes: RaceTrackNode[] = []
        const actualNodes = await RaceTrack.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 RACE TRACK nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)
        await seedNodes(DbNodeType.RaceTrack, totalNodeAmount)

        const actualNodes = await RaceTrack.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
