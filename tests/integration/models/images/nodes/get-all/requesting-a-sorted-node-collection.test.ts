import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {ImageNode} from "../../../../../../src/db/node-types/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A sorted "get all IMAGE nodes" request returns the nodes in correct order', () => {
    test('when there exist no IMAGE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Image)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist IMAGE nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Image)
        const nodeA = await seedNode(DbNodeType.Image, {name: 'A Node'}) as ImageNode
        const nodeB = await seedNode(DbNodeType.Image, {name: 'B Node'}) as ImageNode
        const nodeC = await seedNode(DbNodeType.Image, {name: 'C Node'}) as ImageNode

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
