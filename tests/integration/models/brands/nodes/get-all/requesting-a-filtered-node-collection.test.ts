import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {BrandNode} from "../../../../../../src/models/node-types/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all BRAND nodes" request returns only the matching nodes', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.BRAND)

        const expectedNodes: BrandNode[] = []
        const actualNodes = await Brand.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist BRAND nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.BRAND)
        const nodeA = await seedNode(NodeTypeEnum.BRAND, {name: 'A Node'}) as BrandNode
        await seedNode(NodeTypeEnum.BRAND, {name: 'B Node'})
        await seedNode(NodeTypeEnum.BRAND, {name: 'C Node'})

        const filteredNodes = await Brand.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
