import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Expecting response "false" when trying to delete a non-existing RACING GAME', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing RACING GAME', async () => {
    const node = await seedNode(ControllerNodeType.RacingGame)
    const success = await deleteNode(node.properties.id)

    expect(success)
        .toBe(true)
})
