import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {LapTimeNode} from "../../../../../../src/db/nodes/lap-times/types/LapTimeNode"
import {LapTime} from "../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all LAP TIME nodes" request returns the nodes in correct order', () => {
    test('when there exist no LAP TIME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.LapTime)

        const expectedNodes: LapTimeNode[] = []
        const actualNodes = await LapTime.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist LAP TIME nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.LapTime)
        const nodeA = await seedNode(ControllerNodeType.LapTime, {time: 'A', driver_name: 'A Node'}) as unknown as LapTimeNode
        const nodeB = await seedNode(ControllerNodeType.LapTime, {time: 'B', driver_name: 'B Node'}) as unknown as LapTimeNode
        const nodeC = await seedNode(ControllerNodeType.LapTime, {time: 'C', driver_name: 'C Node'}) as unknown as LapTimeNode

        const ascNodes = await LapTime.findAll({sortByProperty: 'driver_name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.driver_name === nodeA.properties.driver_name)
        expect(ascNodes[1].attributes.driver_name === nodeB.properties.driver_name)
        expect(ascNodes[2].attributes.driver_name === nodeC.properties.driver_name)

        const descNodes = await LapTime.findAll({sortByProperty: 'driver_name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.driver_name === nodeC.properties.driver_name)
        expect(descNodes[1].attributes.driver_name === nodeB.properties.driver_name)
        expect(descNodes[2].attributes.driver_name === nodeA.properties.driver_name)
    })
})
