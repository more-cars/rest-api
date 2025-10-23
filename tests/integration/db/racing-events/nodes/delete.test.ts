import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedRacingEvent} from "../../../../_toolbox/dbSeeding/racing-events/nodes/seedRacingEvent"

test('Expecting response "false" when trying to delete a non-existing RACING EVENT', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing RACING EVENT', async () => {
    const node = await seedRacingEvent()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
