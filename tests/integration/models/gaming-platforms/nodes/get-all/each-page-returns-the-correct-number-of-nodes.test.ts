import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {GamingPlatformNode} from "../../../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"
import {GamingPlatform} from "../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all GAMING PLATFORM nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no GAMING PLATFORM nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.GamingPlatform)

        const expectedNodes: GamingPlatformNode[] = []
        const actualNodes = await GamingPlatform.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 GAMING PLATFORM nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.GamingPlatform)
        await seedNodes(DbNodeType.GamingPlatform, totalNodeAmount)

        const actualNodes = await GamingPlatform.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
