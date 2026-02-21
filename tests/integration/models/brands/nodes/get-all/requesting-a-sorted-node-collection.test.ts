import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {BrandNode} from "../../../../../../src/db/nodes/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all BRAND nodes" request returns the nodes in correct order', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.Brand)

        const expectedNodes: BrandNode[] = []
        const actualNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BRAND nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.Brand)
        const nodeA = await seedNode(ControllerNodeType.Brand, {name: 'A Node'}) as unknown as BrandNode
        const nodeB = await seedNode(ControllerNodeType.Brand, {name: 'B Node'}) as unknown as BrandNode
        const nodeC = await seedNode(ControllerNodeType.Brand, {name: 'C Node'}) as unknown as BrandNode

        const ascNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
