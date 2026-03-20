import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarBrandNode} from "../../../../../../../src/db/node-types/model-car-brands/types/ModelCarBrandNode"
import {ModelCarBrand} from "../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all MODEL CAR BRAND nodes" request returns only the matching nodes', () => {
    test('when there exist no MODEL CAR BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)

        const expectedNodes: ModelCarBrandNode[] = []
        const actualNodes = await ModelCarBrand.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MODEL CAR BRAND nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCarBrand)
        const nodeA = await seedNode(DbNodeType.ModelCarBrand, {name: 'A Node'}) as ModelCarBrandNode
        await seedNode(DbNodeType.ModelCarBrand, {name: 'B Node'})
        await seedNode(DbNodeType.ModelCarBrand, {name: 'C Node'})

        const filteredNodes = await ModelCarBrand.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
