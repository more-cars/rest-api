import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelVariantNode} from "../../../../../../src/models/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {seedCarModelVariant} from "../../../../../_toolbox/dbSeeding/car-model-variants/nodes/seedCarModelVariant"

describe('A sorted "get all CAR MODEL VARIANT nodes" request returns the nodes in correct order', () => {
    test('when there exist NO car model variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)

        const expectedNodes: Array<CarModelVariantNode> = []
        const actualNodes = await CarModelVariant.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist car model variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)
        const nodeA = await seedCarModelVariant({name: 'A Node'})
        const nodeB = await seedCarModelVariant({name: 'B Node'})
        const nodeC = await seedCarModelVariant({name: 'C Node'})

        const ascNodes = await CarModelVariant.findAll({sortByProperty: 'name', sortDirection: 'asc'})
        expect(ascNodes.length).toEqual(3)
        expect(ascNodes[0].name === nodeA.name)
        expect(ascNodes[1].name === nodeB.name)
        expect(ascNodes[2].name === nodeC.name)

        const descNodes = await CarModelVariant.findAll({sortByProperty: 'name', sortDirection: 'desc'})
        expect(descNodes.length).toEqual(3)
        expect(descNodes[0].name === nodeC.name)
        expect(descNodes[1].name === nodeB.name)
        expect(descNodes[2].name === nodeA.name)
    })
})
