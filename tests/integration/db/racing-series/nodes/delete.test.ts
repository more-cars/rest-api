import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedRacingSeries} from "../../../../_toolbox/dbSeeding/racing-series/nodes/seedRacingSeries"

test('Expecting response "false" when trying to delete a non-existing RACING SERIES', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing RACING SERIES', async () => {
    const node = await seedRacingSeries()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
