import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../../src/db/nodes/deleteNode"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

test('Expecting response "false" when trying to delete a non-existing BRAND', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing BRAND', async () => {
    const node = await seedNode(DbNodeType.Brand)
    const success = await deleteNode(node.properties.id)

    expect(success)
        .toBe(true)
})
