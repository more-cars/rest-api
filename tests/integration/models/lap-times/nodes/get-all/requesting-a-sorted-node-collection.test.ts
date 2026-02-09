import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {LapTimeNode} from "../../../../../../src/models/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/lap-times/LapTime"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all LAP TIME nodes" request returns the nodes in correct order', () => {
    test('when there exist no LAP TIME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.LAP_TIME)

        const expectedNodes: LapTimeNode[] = []
        const actualNodes = await LapTime.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist LAP TIME nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.LAP_TIME)
        const nodeA = await seedNode(NodeTypeEnum.LAP_TIME, {time: 'A', driver_name: 'A Node'}) as LapTimeNode
        const nodeB = await seedNode(NodeTypeEnum.LAP_TIME, {time: 'B', driver_name: 'B Node'}) as LapTimeNode
        const nodeC = await seedNode(NodeTypeEnum.LAP_TIME, {time: 'C', driver_name: 'C Node'}) as LapTimeNode

        const ascNodes = await LapTime.findAll({sortByProperty: 'driver_name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].driver_name === nodeA.driver_name)
        expect(ascNodes[1].driver_name === nodeB.driver_name)
        expect(ascNodes[2].driver_name === nodeC.driver_name)

        const descNodes = await LapTime.findAll({sortByProperty: 'driver_name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].driver_name === nodeC.driver_name)
        expect(descNodes[1].driver_name === nodeB.driver_name)
        expect(descNodes[2].driver_name === nodeA.driver_name)
    })
})
