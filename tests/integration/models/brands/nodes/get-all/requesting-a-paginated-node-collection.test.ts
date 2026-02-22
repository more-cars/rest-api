import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {BrandNode} from "../../../../../../src/models/node-types/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all BRAND nodes" request returns the correct number of nodes', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Brand)

        const expectedNodes: BrandNode[] = []
        const actualNodes = await Brand.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Brand)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Brand, amount)

        const actualNodes = await Brand.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
