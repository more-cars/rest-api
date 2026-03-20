import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarBrandNode} from "../../../../../../../src/models/node-types/model-car-brands/types/ModelCarBrandNode"
import {ModelCarBrand} from "../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all MODEL CAR BRAND nodes" request returns the correct number of nodes', () => {
    test('when there exist no MODEL CAR BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)

        const expectedNodes: ModelCarBrandNode[] = []
        const actualNodes = await ModelCarBrand.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MODEL CAR BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.ModelCarBrand, amount)

        const actualNodes = await ModelCarBrand.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
