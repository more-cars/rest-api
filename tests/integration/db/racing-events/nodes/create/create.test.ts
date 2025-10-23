import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/racing-events/createNode"
import {FakeRacingEvent} from "../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"

test('Creating node with valid data', async () => {
    const inputData = FakeRacingEvent.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
