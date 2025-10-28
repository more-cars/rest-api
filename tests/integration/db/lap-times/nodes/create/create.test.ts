import {expect, test} from 'vitest'
import {FakeLapTime} from "../../../../../_toolbox/fixtures/nodes/FakeLapTime"
import {createNode} from "../../../../../../src/db/nodes/lap-times/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeLapTime.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
