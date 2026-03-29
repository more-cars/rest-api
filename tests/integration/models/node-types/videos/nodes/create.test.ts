import {expect, test} from 'vitest'
import {FakeVideo} from "../../../../../_toolbox/fixtures/nodes/FakeVideo"
import {Video} from "../../../../../../src/models/node-types/videos/Video"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeVideo.dbInput
    const createdNode = await Video.create(inputData)

    expect(createdNode.attributes)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeVideo.dbInput
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Video.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
