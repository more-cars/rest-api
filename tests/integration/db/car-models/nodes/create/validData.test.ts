import {createNode} from "../../../../../../src/db/nodes/car-models/createNode"
import FakeCarModel from "../../../../../fixtures/nodes/FakeCarModel"

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeCarModel)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeCarModel))
})
