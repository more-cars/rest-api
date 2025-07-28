import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/images/createNode"
import FakeImageFull from "../../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeImageFull)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeImageFull))
})
