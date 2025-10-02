import {describe, expect, test} from 'vitest'
import {deleteAllCarModels} from "../../../../../_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {seedCarModels} from "../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModels"

describe('A paginated "get all CAR MODEL nodes" request returns the correct number of nodes', () => {
    test('when there exist NO car model nodes', async () => {
        await deleteAllCarModels()

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist car model nodes', async () => {
        await deleteAllCarModels()
        const amount = Math.ceil(Math.random() * 20)
        await seedCarModels(amount)

        const actualNodes = await CarModel.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
