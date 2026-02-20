import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {GamingPlatformNode} from "../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all GAMING PLATFORM nodes" request returns the correct number of nodes', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.GAMING_PLATFORM)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.GAMING_PLATFORM)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.GAMING_PLATFORM, amount)

        const actualNodes = await GamingPlatform.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
