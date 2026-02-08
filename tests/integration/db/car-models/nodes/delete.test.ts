import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Expecting response "false" when trying to delete a non-existing CAR MODEL', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Expecting response "true" when deleting an existing CAR MODEL', async () => {
    const node = await seedNode(NodeTypeEnum.CAR_MODEL)
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
