import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {ImageNode} from "../../../../../../src/models/node-types/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all IMAGE nodes" request returns the nodes in correct order', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.IMAGE)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.IMAGE)
        const nodeA = await seedNode(ControllerNodeType.IMAGE, {name: 'A Node'}) as ImageNode
        const nodeB = await seedNode(ControllerNodeType.IMAGE, {name: 'B Node'}) as ImageNode
        const nodeC = await seedNode(ControllerNodeType.IMAGE, {name: 'C Node'}) as ImageNode

        const ascNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
