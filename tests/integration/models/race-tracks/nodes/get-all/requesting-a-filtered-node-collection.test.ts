import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {RaceTrackNode} from "../../../../../../src/db/node-types/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all RACE TRACK nodes" request returns only the matching nodes', () => {
    test('when there exist no RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)

        const expectedNodes: RaceTrackNode[] = []
        const actualNodes = await RaceTrack.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.RaceTrack)
        const nodeA = await seedNode(DbNodeType.RaceTrack, {name: 'A Node'}) as RaceTrackNode
        await seedNode(DbNodeType.RaceTrack, {name: 'B Node'})
        await seedNode(DbNodeType.RaceTrack, {name: 'C Node'})

        const filteredNodes = await RaceTrack.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
