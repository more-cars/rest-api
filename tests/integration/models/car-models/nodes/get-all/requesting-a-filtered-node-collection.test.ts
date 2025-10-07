import {describe, expect, test} from 'vitest'
import {deleteAllCarModels} from "../../../../../_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedCarModel} from "../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

describe('A filtered "get all CAR MODEL nodes" request returns only the matching nodes', () => {
    test('when there exist NO car model nodes', async () => {
        await deleteAllCarModels()

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist car model nodes', async () => {
        await deleteAllCarModels()
        const nodeA = await seedCarModel({name: 'A Node'})
        await seedCarModel({name: 'B Node'})
        await seedCarModel({name: 'C Node'})

        const filteredNodes = await CarModel.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
