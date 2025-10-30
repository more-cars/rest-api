import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedCarModelVariant} from "../../../../_toolbox/dbSeeding/car-model-variants/nodes/seedCarModelVariant"

test('Expecting response "false" when trying to delete a non-existing CAR MODEL VARIANT', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing CAR MODEL VARIANT', async () => {
    const node = await seedCarModelVariant()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
