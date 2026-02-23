import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {LapTimeNode} from "../../../../../../src/db/node-types/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all LAP TIME nodes" request returns only the matching nodes', () => {
    test('when there exist no LAP TIME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.LapTime)

        const expectedNodes: LapTimeNode[] = []
        const actualNodes = await LapTime.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist LAP TIME nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.LapTime)
        const nodeA = await seedNode(DbNodeType.LapTime, {
            time: 'A', driver_name: 'A Node'
        }) as unknown as LapTimeNode
        await seedNode(DbNodeType.LapTime, {time: 'B', driver_name: 'B Node'})
        await seedNode(DbNodeType.LapTime, {time: 'C', driver_name: 'C Node'})

        const filteredNodes = await LapTime.findAll({
            filterByProperty: 'driver_name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.driver_name === nodeA.properties.driver_name)
    })
})
