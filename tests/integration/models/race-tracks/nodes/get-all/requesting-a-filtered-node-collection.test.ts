import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {RaceTrackNode} from "../../../../../../src/db/nodes/race-tracks/types/RaceTrackNode"
import {RaceTrack} from "../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all RACE TRACK nodes" request returns only the matching nodes', () => {
    test('when there exist no RACE TRACK nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.RaceTrack)

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
        await deleteAllNodesOfType(ControllerNodeType.RaceTrack)
        const nodeA = await seedNode(ControllerNodeType.RaceTrack, {
            name: 'A Node'
        }) as unknown as RaceTrackNode
        await seedNode(ControllerNodeType.RaceTrack, {name: 'B Node'})
        await seedNode(ControllerNodeType.RaceTrack, {name: 'C Node'})

        const filteredNodes = await RaceTrack.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
