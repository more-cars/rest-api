import {describe, expect, test} from 'vitest'
import {deleteAllBrands} from "../../../../../_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import type {BrandNode} from "../../../../../../src/models/brands/types/BrandNode"
import {Brand} from "../../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

describe('A sorted "get all BRAND nodes" request returns the nodes in correct order', () => {
    test('when there exist NO brand nodes', async () => {
        await deleteAllBrands()

        const expectedNodes: Array<BrandNode> = []
        const actualNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist brand nodes', async () => {
        await deleteAllBrands()
        const nodeA = await seedBrand({name: 'A Node'})
        const nodeB = await seedBrand({name: 'B Node'})
        const nodeC = await seedBrand({name: 'C Node'})

        const ascNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await Brand.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
