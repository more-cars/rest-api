import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/brands/Brand"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all BRAND nodes" request returns the correct number of nodes', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.BRAND)

        const expectedNodes: Array<BrandNode> = []
        const actualNodes = await Brand.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BRAND nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.BRAND)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.BRAND, amount)

        const actualNodes = await Brand.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
