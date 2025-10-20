import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedRaceTrack} from "../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTrack"

test('Expecting response "false" when trying to delete a non-existing RACE TRACK', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing RACE TRACK', async () => {
    const node = await seedRaceTrack()
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
