import {expect, test} from 'vitest'
import {deleteAllCarModelVariants} from "../../../../_toolbox/dbSeeding/car-model-variants/nodes/deleteAllCarModelVariants"
import {CarModelVariantNode} from "../../../../../src/db/nodes/car-model-variants/types/CarModelVariantNode"
import {seedCarModelVariants} from "../../../../_toolbox/dbSeeding/car-model-variants/nodes/seedCarModelVariants"
import {getAllNodesOfType} from "../../../../../src/db/nodes/car-model-variants/getAllNodesOfType"

test('When there are no CAR MODEL VARIANTS then an empty array should be returned', async () => {
    await deleteAllCarModelVariants()

    const expectedCarModelVariants: Array<CarModelVariantNode> = []
    const actualCarModelVariants = await getAllNodesOfType()

    expect(actualCarModelVariants)
        .toEqual(expectedCarModelVariants)
})

test('When CAR MODEL VARIANTS exist then all of them should be returned', async () => {
    await deleteAllCarModelVariants()
    const amount = Math.ceil(Math.random() * 50)
    await seedCarModelVariants(amount)

    const actualCarModelVariants = await getAllNodesOfType()

    expect(actualCarModelVariants.length)
        .toEqual(amount)
})
