import {createNode} from "../../../../../../src/db/nodes/brands/createNode"
import FakeBrand from "../../../../../fixtures/nodes/FakeBrand"

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeBrand)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeBrand))
})
