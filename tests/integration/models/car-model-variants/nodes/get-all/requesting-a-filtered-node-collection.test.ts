import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CarModelVariantNode} from "../../../../../../src/models/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/car-model-variants/CarModelVariant"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all CAR MODEL VARIANT nodes" request returns only the matching nodes', () => {
    test('when there exist NO Car Model Variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)

        const expectedNodes: Array<CarModelVariantNode> = []
        const actualNodes = await CarModelVariant.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist Car Model Variant nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.CAR_MODEL_VARIANT)
        const nodeA = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT, {name: 'A Node'}) as CarModelVariantNode
        await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT, {name: 'B Node'})
        await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT, {name: 'C Node'})

        const filteredNodes = await CarModelVariant.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
