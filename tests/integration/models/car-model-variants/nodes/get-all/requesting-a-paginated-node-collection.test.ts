import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {CarModelVariantNode} from "../../../../../../src/models/node-types/car-model-variants/types/CarModelVariantNode"
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('A paginated "get all CAR MODEL VARIANT nodes" request returns the correct number of nodes', () => {
    test('when there exist no CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModelVariant)

        const expectedNodes: CarModelVariantNode[] = []
        const actualNodes = await CarModelVariant.findAll({page: 1})

        expect(expectedNodes)
            .toEqual(actualNodes)
    })

    test('when there exist CAR MODEL VARIANT nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.CarModelVariant)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.CarModelVariant, amount)

        const actualNodes = await CarModelVariant.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
