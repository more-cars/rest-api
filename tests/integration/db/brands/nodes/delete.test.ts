import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedBrand} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

test('Deleting an BRAND that does not exist should return "false"', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Deleting an BRAND that does exist should return "true"', async () => {
    const node = await seedBrand()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
