import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedTrackLayout} from "../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayout"

test('Expecting response "false" when trying to delete a non-existing TRACK LAYOUT', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing TRACK LAYOUT', async () => {
    const node = await seedTrackLayout()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
