import {expect, test} from 'vitest'
import {FakeTrackLayout} from "../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"
import {createNode} from "../../../../../../src/db/nodes/track-layouts/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeTrackLayout.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
