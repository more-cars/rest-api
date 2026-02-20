import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/images/createNode"
import FakeImageFull from "../../../../../_toolbox/fixtures/nodes/FakeImageFull"

test('Creating node with valid data', async () => {
    const createdNode = await createNode(FakeImageFull)

    expect(createdNode.properties)
        .toEqual(expect.objectContaining(FakeImageFull))
})
