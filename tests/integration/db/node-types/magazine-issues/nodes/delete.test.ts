import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../../src/db/nodes/deleteNode"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

test('Expecting response "false" when trying to delete a non-existing MAGAZINE ISSUE', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing MAGAZINE ISSUE', async () => {
    const node = await seedNode(DbNodeType.MagazineIssue)
    const success = await deleteNode(node.properties.id)

    expect(success)
        .toBe(true)
})
