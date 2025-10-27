import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedRacingSession} from "../../../../_toolbox/dbSeeding/racing-sessions/nodes/seedRacingSession"

test('Expecting response "false" when trying to delete a non-existing RACING SESSION', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing RACING SESSION', async () => {
    const node = await seedRacingSession()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
