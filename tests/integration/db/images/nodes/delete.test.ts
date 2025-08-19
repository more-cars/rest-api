import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedImage} from "../../../../_toolbox/dbSeeding/images/nodes/seedImage"

test('Deleting an IMAGE that does not exist should return "false"', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Deleting an IMAGE that does exist should return "true"', async () => {
    const node = await seedImage()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
