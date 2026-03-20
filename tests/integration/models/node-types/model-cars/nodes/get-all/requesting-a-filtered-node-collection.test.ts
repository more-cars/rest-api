import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import type {ModelCarNode} from "../../../../../../../src/db/node-types/model-cars/types/ModelCarNode"
import {ModelCar} from "../../../../../../../src/models/node-types/model-cars/ModelCar"
import {FilterOperator} from "../../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all MODEL CAR nodes" request returns only the matching nodes', () => {
    test('when there exist no MODEL CAR nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)

        const expectedNodes: ModelCarNode[] = []
        const actualNodes = await ModelCar.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist MODEL CAR nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.ModelCar)
        const nodeA = await seedNode(DbNodeType.ModelCar, {name: 'A Node'}) as ModelCarNode
        await seedNode(DbNodeType.ModelCar, {name: 'B Node'})
        await seedNode(DbNodeType.ModelCar, {name: 'C Node'})

        const filteredNodes = await ModelCar.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
