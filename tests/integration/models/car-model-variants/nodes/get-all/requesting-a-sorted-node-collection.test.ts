import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelVariantNode} from "../../../../../../src/models/node-types/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A sorted "get all CAR MODEL VARIANT nodes" request returns the nodes in correct order', () => {
    test('when there exist no CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)

        const expectedNodes: CarModelVariantNode[] = []
        const actualNodes = await CarModelVariant.findAll({sortByProperty: 'name', sortDirection: 'desc'})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)
        const nodeA = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT, {name: 'A Node'}) as CarModelVariantNode
        const nodeB = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT, {name: 'B Node'}) as CarModelVariantNode
        const nodeC = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT, {name: 'C Node'}) as CarModelVariantNode

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
