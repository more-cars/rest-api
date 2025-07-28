import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/brands/createNode"
import FakeBrand from "../../../../../_toolbox/fixtures/nodes/FakeBrand"

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeBrand)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeBrand))
})
