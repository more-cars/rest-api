import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {GamingPlatformNode} from "../../../../../../src/models/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/gaming-platforms/GamingPlatform"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all GAMING PLATFORM nodes" request returns the nodes in correct order', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.GAMING_PLATFORM)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.GAMING_PLATFORM)
        const nodeA = await seedNode(NodeTypeEnum.GAMING_PLATFORM, {name: 'A Node'}) as GamingPlatformNode
        const nodeB = await seedNode(NodeTypeEnum.GAMING_PLATFORM, {name: 'B Node'}) as GamingPlatformNode
        const nodeC = await seedNode(NodeTypeEnum.GAMING_PLATFORM, {name: 'C Node'}) as GamingPlatformNode

        const ascNodes = await GamingPlatform.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await GamingPlatform.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
