import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {CarModelNode} from "../../../../../../src/db/node-types/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A filtered "get all CAR MODEL nodes" request returns only the matching nodes', () => {
    test('when there exist no CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModel)

        const expectedNodes: CarModelNode[] = []
        const actualNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModel)
        const nodeA = await seedNode(DbNodeType.CarModel, {name: 'A Node'}) as CarModelNode
        await seedNode(DbNodeType.CarModel, {name: 'B Node'})
        await seedNode(DbNodeType.CarModel, {name: 'C Node'})

        const filteredNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
