import {expect, test} from 'vitest'
import {deleteNode} from "../../../../../src/db/nodes/deleteNode"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Deleting an CAR MODEL that does not exist should return "false"', async () => {
    const success = await deleteNode(-42)

    expect(success)
        .toBe(false)
})

test('Deleting an CAR MODEL that does exist should return "true"', async () => {
    const node = await seedNode(NodeTypeEnum.CAR_MODEL)
    const success = await deleteNode(node.id)

    expect(success)
        .toBe(true)
})
