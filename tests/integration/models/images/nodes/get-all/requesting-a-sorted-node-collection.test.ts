import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {ImageNode} from "../../../../../../src/db/nodes/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all IMAGE nodes" request returns the nodes in correct order', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.Image)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.Image)
        const nodeA = await seedNode(ControllerNodeType.Image, {
            name: 'A Node'
        }) as unknown as ImageNode
        const nodeB = await seedNode(ControllerNodeType.Image, {
            name: 'B Node'
        }) as unknown as ImageNode
        const nodeC = await seedNode(ControllerNodeType.Image, {
            name: 'C Node'
        }) as unknown as ImageNode

        const ascNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
