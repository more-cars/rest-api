import {expect, test} from 'vitest'
import {FakeBrand} from "../../../../../_toolbox/fixtures/nodes/FakeBrand"
import {createNode} from "../../../../../../src/db/nodes/brands/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeBrand.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
