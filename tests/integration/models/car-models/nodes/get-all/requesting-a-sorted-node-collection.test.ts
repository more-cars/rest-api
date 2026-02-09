import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all CAR MODEL nodes" request returns the nodes in correct order', () => {
    test('when there exist no CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL)
        const nodeA = await seedNode(NodeTypeEnum.CAR_MODEL, {name: 'A Node'}) as CarModelNode
        const nodeB = await seedNode(NodeTypeEnum.CAR_MODEL, {name: 'B Node'}) as CarModelNode
        const nodeC = await seedNode(NodeTypeEnum.CAR_MODEL, {name: 'C Node'}) as CarModelNode

        const ascNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
