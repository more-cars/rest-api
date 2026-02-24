import {expect, test} from 'vitest'
import {FakeImage} from "../../../../../_toolbox/fixtures/nodes/FakeImage"
import {createNode} from "../../../../../../src/db/node-types/images/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeImage.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode.properties)
        .toEqual(expect.objectContaining(inputData))
})
