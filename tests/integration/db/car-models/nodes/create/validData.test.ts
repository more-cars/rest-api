import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/car-models/createNode"
import FakeCarModel from "../../../../../_toolbox/fixtures/nodes/FakeCarModel"

test('When providing valid data the new node can be created', async () => {
    const createdNode = await createNode(FakeCarModel)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeCarModel))
})
