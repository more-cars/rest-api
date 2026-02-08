import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {RaceTrackNode} from "../../../../../../src/models/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/race-tracks/RaceTrack"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedRaceTrack} from "../../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTrack"

describe('A filtered "get all RACE TRACK nodes" request returns only the matching nodes', () => {
    test('when there exist NO Race Track nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACE_TRACK)

        const expectedNodes: Array<RaceTrackNode> = []
        const actualNodes = await RaceTrack.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Race Track nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.RACE_TRACK)
        const nodeA = await seedRaceTrack({name: 'A Node'})
        await seedRaceTrack({name: 'B Node'})
        await seedRaceTrack({name: 'C Node'})

        const filteredNodes = await RaceTrack.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
