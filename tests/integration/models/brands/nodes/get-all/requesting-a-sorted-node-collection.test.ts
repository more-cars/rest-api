import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/brands/Brand"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all BRAND nodes" request returns the nodes in correct order', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.BRAND)

        const expectedNodes: Array<BrandNode> = []
        const actualNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BRAND nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.BRAND)
        const nodeA = await seedNode(NodeTypeEnum.BRAND, {name: 'A Node'}) as BrandNode
        const nodeB = await seedNode(NodeTypeEnum.BRAND, {name: 'B Node'}) as BrandNode
        const nodeC = await seedNode(NodeTypeEnum.BRAND, {name: 'C Node'}) as BrandNode

        const ascNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
