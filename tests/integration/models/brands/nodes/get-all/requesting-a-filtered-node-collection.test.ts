import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {BrandNode} from "../../../../../../src/db/nodes/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/node-types/brands/Brand"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all BRAND nodes" request returns only the matching nodes', () => {
    test('when there exist no BRAND nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.Brand)

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
        await deleteAllNodesOfType(ControllerNodeType.Brand)
        const nodeA = await seedNode(ControllerNodeType.Brand, {name: 'A Node'}) as unknown as BrandNode
        await seedNode(ControllerNodeType.Brand, {name: 'B Node'})
        await seedNode(ControllerNodeType.Brand, {name: 'C Node'})

        const filteredNodes = await Brand.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
