import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {LapTimeNode} from "../../../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all LAP TIME nodes" request returns only the matching nodes', () => {
    test('when there exist no LAP TIME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.LAP_TIME)

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
        await deleteAllNodesOfType(NodeTypeEnum.LAP_TIME)
        const nodeA = await seedNode(NodeTypeEnum.LAP_TIME, {time: 'A', driver_name: 'A Node'}) as LapTimeNode
        await seedNode(NodeTypeEnum.LAP_TIME, {time: 'B', driver_name: 'B Node'})
        await seedNode(NodeTypeEnum.LAP_TIME, {time: 'C', driver_name: 'C Node'})

        const filteredNodes = await LapTime.findAll({
            filterByProperty: 'driver_name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].driver_name === nodeA.driver_name)
    })
})
