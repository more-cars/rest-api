import {describe, expect, test} from 'vitest'
import {deleteAllCarModels} from "../../../../../_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import type {CarModelNode} from "../../../../../../src/models/car-models/types/CarModelNode"
import {CarModel} from "../../../../../../src/models/car-models/CarModel"
import {seedCarModel} from "../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

describe('A sorted "get all CAR MODEL nodes" request returns the nodes in correct order', () => {
    test('when there exist NO car model nodes', async () => {
        await deleteAllCarModels()

        const expectedNodes: Array<CarModelNode> = []
        const actualNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist car model nodes', async () => {
        await deleteAllCarModels()
        const nodeA = await seedCarModel({name: 'A Node'})
        const nodeB = await seedCarModel({name: 'B Node'})
        const nodeC = await seedCarModel({name: 'C Node'})

        const ascNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await CarModel.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
