import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {GamingPlatformNode} from "../../../../../../src/db/nodes/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all GAMING PLATFORM nodes" request returns the nodes in correct order', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.GamingPlatform)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.GamingPlatform)
        const nodeA = await seedNode(ControllerNodeType.GamingPlatform, {
            name: 'A Node'
        }) as unknown as GamingPlatformNode
        const nodeB = await seedNode(ControllerNodeType.GamingPlatform, {
            name: 'B Node'
        }) as unknown as GamingPlatformNode
        const nodeC = await seedNode(ControllerNodeType.GamingPlatform, {
            name: 'C Node'
        }) as unknown as GamingPlatformNode

        const ascNodes = await GamingPlatform.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].attributes.name === nodeA.properties.name)
        expect(ascNodes[1].attributes.name === nodeB.properties.name)
        expect(ascNodes[2].attributes.name === nodeC.properties.name)

        const descNodes = await GamingPlatform.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].attributes.name === nodeC.properties.name)
        expect(descNodes[1].attributes.name === nodeB.properties.name)
        expect(descNodes[2].attributes.name === nodeA.properties.name)
    })
})
