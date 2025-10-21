import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/track-layouts/createNode"
import FakeTrackLayout from "../../../../../_toolbox/fixtures/nodes/FakeTrackLayout"

test('Creating node with valid data', async () => {
    const createdNode = await createNode(FakeTrackLayout)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeTrackLayout))
})
