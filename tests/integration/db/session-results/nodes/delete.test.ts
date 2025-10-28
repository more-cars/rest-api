import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedSessionResult} from "../../../../_toolbox/dbSeeding/session-results/nodes/seedSessionResult"

test('Expecting response "false" when trying to delete a non-existing SESSION RESULT', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing SESSION RESULT', async () => {
    const node = await seedSessionResult()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
