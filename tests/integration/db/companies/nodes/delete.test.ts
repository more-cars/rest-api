import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedCompany} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"

test('Expecting response "false" when trying to delete a non-existing COMPANY', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing COMPANY', async () => {
    const node = await seedCompany()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
