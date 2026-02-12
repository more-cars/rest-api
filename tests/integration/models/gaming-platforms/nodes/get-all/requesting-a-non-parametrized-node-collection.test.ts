import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {GamingPlatformNode} from "../../../../../../src/models/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/gaming-platforms/GamingPlatform"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all GAMING PLATFORM nodes" request returns the correct number of nodes', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.GAMING_PLATFORM)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.GAMING_PLATFORM)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.GAMING_PLATFORM, amount)

        const actualNodes = await GamingPlatform.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
