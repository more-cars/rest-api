import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {CarModelVariantNode} from "../../../../../../src/db/nodes/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"

describe('A filtered "get all CAR MODEL VARIANT nodes" request returns only the matching nodes', () => {
    test('when there exist no CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.CAR_MODEL_VARIANT)

        const expectedNodes: CarModelVariantNode[] = []
        const actualNodes = await CarModelVariant.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.CAR_MODEL_VARIANT)
        const nodeA = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT, {name: 'A Node'}) as unknown as CarModelVariantNode
        await seedNode(ControllerNodeType.CAR_MODEL_VARIANT, {name: 'B Node'})
        await seedNode(ControllerNodeType.CAR_MODEL_VARIANT, {name: 'C Node'})

        const filteredNodes = await CarModelVariant.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].attributes.name === nodeA.properties.name)
    })
})
