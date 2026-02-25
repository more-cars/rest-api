import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {RaceTrackNode} from "../../../../../../src/models/node-types/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all RACE TRACK nodes" request returns the correct number of nodes', () => {
    test('when there exist no RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)

        const expectedNodes: RaceTrackNode[] = []
        const actualNodes = await RaceTrack.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.RaceTrack, amount)

        const actualNodes = await RaceTrack.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
