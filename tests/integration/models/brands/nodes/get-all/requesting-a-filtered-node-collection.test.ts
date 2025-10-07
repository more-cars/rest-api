import {describe, expect, test} from 'vitest'
import {deleteAllBrands} from "../../../../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import type {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/brands/Brand"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedBrand} from "../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

describe('A filtered "get all BRAND nodes" request returns only the matching nodes', () => {
    test('when there exist NO brand nodes', async () => {
        await deleteAllBrands()

        const expectedNodes: Array<BrandNode> = []
        const actualNodes = await Brand.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist brand nodes', async () => {
        await deleteAllBrands()
        const nodeA = await seedBrand({name: 'A Node'})
        await seedBrand({name: 'B Node'})
        await seedBrand({name: 'C Node'})

        const filteredNodes = await Brand.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
