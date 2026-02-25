import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {GamingPlatformNode} from "../../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A non-parametrized "get all GAMING PLATFORM nodes" request returns the correct number of nodes', () => {
    test('when there exist no GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.GamingPlatform)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist GAMING PLATFORM nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.GamingPlatform)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.GamingPlatform, amount)

        const actualNodes = await GamingPlatform.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
