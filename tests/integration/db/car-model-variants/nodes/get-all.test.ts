import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariantNode} from "../../../../../src/db/nodes/car-model-variants/types/CarModelVariantNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/car-model-variants/getAllNodesOfType"

test('When there are no CAR MODEL VARIANTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.CarModelVariant)

    const expectedCarModelVariants: CarModelVariantNode[] = []
    const actualCarModelVariants = await getAllNodesOfType()

    expect(actualCarModelVariants)
        .toEqual(expectedCarModelVariants)
})

test('When CAR MODEL VARIANTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.CarModelVariant)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.CarModelVariant, amount)

    const actualCarModelVariants = await getAllNodesOfType()

    expect(actualCarModelVariants.length)
        .toEqual(amount)
})
