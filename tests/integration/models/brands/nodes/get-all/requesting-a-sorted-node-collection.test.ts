import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {BrandNode} from "../../../../../../src/models/node-types/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all BRAND nodes" request returns the nodes in correct order', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.BRAND)

        const expectedNodes: BrandNode[] = []
        const actualNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BRAND nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.BRAND)
        const nodeA = await seedNode(ControllerNodeType.BRAND, {name: 'A Node'}) as BrandNode
        const nodeB = await seedNode(ControllerNodeType.BRAND, {name: 'B Node'}) as BrandNode
        const nodeC = await seedNode(ControllerNodeType.BRAND, {name: 'C Node'}) as BrandNode

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
